name := "World Bank Analytics"

version := "1.0"

scalaVersion := "2.11.7"

// addSbtPlugin("com.eed3si9n" % "sbt-assemply" % "0.14.5")

libraryDependencies ++= Seq(
	"org.apache.spark" %% "spark-core" % "2.1.1",
	"org.mongodb.spark" %% "mongo-spark-connector" % "2.1.0",
	"org.mongodb" %% "casbah" % "3.1.1",
	// "org.mongodb.scala" %% "mongo-scala-driver" % "2.1.1",
	"org.apache.spark" %% "spark-sql" % "2.1.1"
	)