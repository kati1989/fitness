<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Kati Fitness Gym</title>
</head>


<body>
<h1>Cities</h1>

<?php
$conect = mysqli_connect("localhost", "root", "", "fitness");
if ($conect == false)
{
	print "Error conecting to database! <br />";
	die();
}

$sql = "SELECT * FROM cities ORDER BY city_name";
$tbl = mysqli_query($conect, $sql);
$nr = mysqli_num_rows($tbl);

if ($nr <= 0)
{
	print "Error! There are no data in database! <br />";
	die();
}

for($i=1; $i<=$nr; $i++)
{
	$row = mysqli_fetch_array($tbl);
	
	$city_id = intval($row["city_id"]);
	$city_name = ucwords(trim($row["city_name"]));
	$description = ucfirst(trim($row["description"]));
	
	print $city_id . " " . $city_name . " " . $description . "<br />";
}

mysqli_close($conect);

?>

</body>
</html>
