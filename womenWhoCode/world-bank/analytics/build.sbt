import play.Project._

name := "World Bank Analytics"

version := "1.0"

scalaVersion := "2.11.7"

playScalaSettings

libraryDependencies ++= Seq(
	"org.apache.spark" %% "spark-core" % "2.1.1",
	"com.typesafe.play" %% "play" % "2.2.2"
	)