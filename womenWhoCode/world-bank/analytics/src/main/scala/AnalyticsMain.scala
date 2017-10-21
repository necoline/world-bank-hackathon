import org.apache.spark.SparkContext
import org.apache.spark.SparkContext._
import org.apache.spark.SparkConf
import java.io._

case class MetricKey(country: CountryKey, indicator: IndicatorKey)

case class CountryKey(name: String, code: String)

case class IndicatorKey(name: String, code: String)


object Analytics{
  
  def main(args: Array[String]){
    println("hello world")

    val inputPath = "input/GEPData.csv"
    val conf = new SparkConf().setAppName("World Bank Analytics")
    val sc = new SparkContext(conf)
    val inputData = sc.textFile(inputPath, 2).cache()

    val header = inputData.first

    val rdd = inputData
      .filter(_ != header)
      .map { line =>
        line.stripPrefix("\"").stripSuffix("\",").split("\",\"") match {
          case Array(cName, cCode, iName, iCode, timeSeries @_*) => {
            val countryKey = CountryKey(cName, cCode)
            val indicatorKey = IndicatorKey(iName, iCode)
            val metricKey = MetricKey(countryKey, indicatorKey)
            // val ts = timeSeries
            val ts = timeSeries.map {x => 
              x match {
                case x if (! x.isEmpty) => Some(x.toDouble)
                case _ => None
              }
            }

            (metricKey, ts)
          }
        }
    }
    rdd.take(10).foreach(println(_))

    sc.stop()
  }
}