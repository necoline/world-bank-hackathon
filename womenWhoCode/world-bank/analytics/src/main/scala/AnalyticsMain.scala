import org.apache.spark.SparkContext
import org.apache.spark.SparkContext._
import org.apache.spark.SparkConf
import com.mongodb.spark._
import com.mongodb.spark.config._
import com.mongodb.casbah.Imports._
import org.apache.spark.sql._

case class MetricKey(country: CountryKey, indicator: IndicatorKey)

case class CountryKey(name: String, code: String)

case class IndicatorKey(name: String, code: String)

case class PostResource(id: String, link: String, title: String, body: String)

case class TimeValue(date: String, value: Option[Double])


case class TimeSeries(ts: Vector[TimeValue]) {
  lazy val tsDefined = ts.map(_.value).flatten

  def avg() = if (tsDefined.length > 0) tsDefined.sum / tsDefined.length else 0d
  def max = if (tsDefined.length > 0) tsDefined.max else 0
  def min = if (tsDefined.length > 0) tsDefined.min else 0

  def toJsArray = ts.filter(_.value.isDefined).map(a => a.date + ":" + a.value.get.toString)
}


object Analytics{
  
  def main(args: Array[String]){
    println("hello world")

    val mongoClient = MongoClient("localhost", 27017)
    val db = mongoClient("test")
    val coll = db("testCollection")


    val inputPath = "input/GEPData.csv"
    val conf = new SparkConf()
      .setMaster("local[2]")
      .setAppName("World Bank Analytics")
    val sc = new SparkContext(conf)
    val inputData = sc.textFile(inputPath, 2).cache()

    val header = inputData.first



    val timeStamps = header
      .stripPrefix("\"")
      .stripSuffix("\",")
      .split("\",\"") match {
        case Array(a,b,c,d, years @_*) =>
          years
      }


    val rdd = inputData
      .filter(_ != header)
      .map { line =>
        line.stripPrefix("\"").stripSuffix("\",").split("\",\"") match {
          case Array(cName, cCode, iName, iCode, timeSeries @_*) => {
            val countryKey = CountryKey(cName, cCode)
            val indicatorKey = IndicatorKey(iName, iCode)
            val metricKey = MetricKey(countryKey, indicatorKey)
            // val ts = timeSeries
            val timeValues = timeSeries.map {x => 
              x match {
                case x if (! x.isEmpty) => Some(x.toDouble)
                case _ => None
              }
            }
            val ts = (timeStamps zip timeValues)
              .map(x => TimeValue(x._1, x._2))
              .toVector

            (metricKey, TimeSeries(ts))
          }
        }
    }

    val rawColl = db("gdpRaw")
    val mongoRaw = rdd.map { case (key, ts) =>
      val keyJson = (key.country.name + " " + key.indicator.name).replace(".","")
      val tsJson = ts.toJsArray

      (keyJson, tsJson)}.collect.toMap
    rawColl.insert(mongoRaw)


    // rdd.take(10).foreach(println(_))

    val aggColl = db("gdpAggregations")
    val mongoAggregations = rdd.map { case (key, ts) =>
      // val keyJson = { "{\n" + "\"Country Name\": \"" + key.country.name + "\",\n" +
      //                      "\"Country Code\": \"" + key.country.code + "\",\n" +
      //                      "\"Indicator Name\": \"" + key.indicator.name + "\",\n" +
      //                      "\"Indicator Code\": \"" + key.indicator.code + "\"\n" +
      //                      "}"
      //               }
      // val aggJson = { "{\n" + "\"average: \"" + ts.avg.toString + "\",\n" +
      //                      "\"max: \"" + ts.max.toString + "\",\n" +
      //                      "\"min: \"" + ts.min.toString + "\"\n" +
      //                      "}"
      //               }
      val keyJson = (key.country.name + " " + key.indicator.name).replace(".","")
      val avg = ts.avg.toString
      val Ma = ts.max.toString
      val m = ts.min.toString

      val aggJson = List("average: " + avg, "max: " + Ma, "min: " + m)
      (keyJson, aggJson)
      // List((keyJson + " average", avg), (keyJson + " max", M), (keyJson + " min", m))
    }
    val x = mongoAggregations.collect.toMap
    // println(x)
    aggColl.insert(x)

    sc.stop()
  }
}