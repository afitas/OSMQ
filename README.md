# **OSMQ PROJECT**

&nbsp;

#### **description :**

- OpenStreetMap (OSM) is a collaborative online mapping project. This project can be compared to that of Wikipedia for a free and open map of the whole world. OSM groups together visible physical objects such as: roads, buildings, services of public interest (schools, hospitals, etc.), shops, industries, water and sanitation points, natural environments, etc. non-visible features such as transport lines, place names or administrative boundaries. Volunteers from all over the world, more commonly known as “contributors”, share this information with OSM's own. Indeed, the number of contributions is increasing exponentially, due to its growing popularity. Several problems arise from this in evaluating the quality of these data.

- The most common approach to data quality assessment is to compare OSM data to a benchmark dataset (also called the extrinsic approach). However, this reference data is not always available, and this for various reasons, related to the right to use government data, or for exorbitant license prices. In order to answer this problem, an intrinsic approach will be used, where the OSM data will be compared to itself according to a predefined time interval.

- The main objective of this work is to develop a web application, by applying statistical calculation methods on historical OSM data. This will allow us to assess the quality of our data set according to the completeness of the road network, the development of invalid geometries (invalid polygons), the news of OSM entities, but also the study of the behavior of contributors. These results will be represented in the form of graphs but also in cartographic form. With the help of these, we will be able to decide on the quality of our data set.

Keywords: OpenStreetMap, Completeness, exhaustiveness, road network, intrinsic indicators, Web application.

&nbsp;

#### **Dependencies :**

- python >= 3.6
- postgresql >= 10 (optinally)
- Geo-server >= 12

&nbsp;

#### **1- Clone git repo :**

```
git clone https://github.com/afitas/OSMQ.git
cd OSMQ
```

&nbsp;

#### **2- Load DATA :**

PostgreSQL Must be instaled on your computer
cd OSMQ\server_osmq
load_data.bat

&nbsp;

#### **3- Install dependencies :**

```
cd OSMQ\server_osmq
python -m venv .venv # only for the first time
.venv\Scripts\activate
pip install -r requirements.txt

Or with ANACONADA:
- Create a new environement <name, exemple : PFE>
- activate it with command : conda activate <PFE>
cd OSMQ\server_osmq
pip install -r requirements.txt
```

&nbsp;

#### **4- Run flask server :**

```
cd OSMQ\server_osmq
flask db upgrade   # only for the first time or after a git pull
load_data.bat # if you want to load initial data like codelist see "sql/" directory, WARNING this command is only used with postgresql db(you must include the link of the folder bin that it is located in postgre inside the environement variable PATH)
start.bat
```

&nbsp;

#### **5- Run Geo-Server :**

```
cd OSMQ\geoserver2.19
cd bin
startup.bat
```

&nbsp;

#### Running**

Now you should be able de run your APP on any navigator line "google chome" on the addresse : http://127.0.0.1:5000/
 
&nbsp;

