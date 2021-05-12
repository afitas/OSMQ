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
- nodejs >= 12

&nbsp;

#### **1- Clone git repo :**

```
git clone https://github.com/afitas/OSMQ.git
cd OSMQ
```

&nbsp;

#### **2- Configuration :**

Eventually you can override the config.py file configuration by creating a new file server_rna\instance\config.py from server_rna\instance\config.py.template, and put in it your configuration for example your local database connection path or your local directories.

&nbsp;

#### **3- Install dependencies :**

```
cd OSMQ\server_osmq
python -m venv .venv # only for the first time
.venv\Scripts\activate
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

#### **5- Run vuejs server :**

```
cd OSMQ\vue_apps
npm install
npm run watch # See package.json and vue.config.js to understand where the vue html template is generated
```

&nbsp;

#### **6- Add initial data and create extentions:**

If you need to add initial data (database) then create your model and export your data in an sql file in the sqls/ directory (The sql file should be commited in git).
  
Create postgresql extentions:
```
create extension postgis;
```
&nbsp;

#### **7- Contribution :**

1- Sync your master branch with the remote repo And create your feature branch

```
git checkout master
git pull origin master
git checkout -b feat/#YOUR_BRANCH_NUMBER
```

2- Make your source code changes And add commit them\*\*

3- Again sync your master branch with the remote repo before the push

```
git checkout master
git pull origin master
```

4- If the branch master changed then you have to rebase your feature branch and resolve any conflicts

```
git rebase master feat/#YOUR_BRANCH_NUMBER
```

5- Push your feature branch

```
git push origin feat/#YOUR_BRANCH_NUMBER
```
