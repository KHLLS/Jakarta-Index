# Jakarta Property Index

CLI-based Property Management & Market Analytics Application using MongoDB and Node.js.

---

# Overview

Jakarta Property Index adalah aplikasi Command Line Interface (CLI) berbasis Node.js dan MongoDB yang digunakan untuk:

* Menjelajahi listing properti
* Melihat detail properti
* Mengelola data properti, agent, dan lokasi
* Melakukan analisis pasar properti Jakarta menggunakan MongoDB Aggregation

Project ini dibuat dengan arsitektur modular menggunakan:

* Menu Layer
* Feature Layer
* Model Layer
* Formatter Utility

Sehingga code lebih reusable, scalable, dan mudah dikembangkan.

---

# Features

## 1. Property Explorer

Fitur pencarian dan filter listing properti.

### Available Features

* Find Property By District
* Find Property By City
* Filter By Price Range
* Filter By Bedrooms
* Filter By Bathrooms
* Filter By Status
* Sort By Price
* Sort By Building Size
* Sort By Land Size

---

## 2. Property Detail

Menampilkan detail lengkap properti menggunakan MongoDB Aggregation dan Lookup.

### Available Features

* Find Property Detail By ID
* Show Agent Information
* Show Location Information
* Find Similar Property

---

## 3. Market Analytics

Analisis data pasar properti menggunakan MongoDB Aggregation Pipeline.

### Available Features

* District Ranking
* Price Distribution
* District Comparison
* Agent Ranking

### Analytics Description

#### District Ranking

Meranking kecamatan berdasarkan rata-rata harga tanah per meter persegi.

#### Price Distribution

Mengelompokkan listing berdasarkan bucket harga.

#### District Comparison

Menampilkan:

* Average Price
* Maximum Price
* Minimum Price
* Total Listing

per wilayah.

#### Agent Ranking

Meranking agent berdasarkan jumlah properti SOLD.

---

## 4. Data Management

CRUD untuk seluruh data utama.

### Property Management

* Show All Property
* Add Property
* Update Property
* Delete Property

### Agent Management

* Show All Agent
* Add Agent
* Update Agent
* Delete Agent

### Location Management

* Show All Location
* Add Location
* Update Location
* Delete Location

---

# Tech Stack

* Node.js
* MongoDB
* MongoDB Native Driver
* readline-sync

---

# Project Structure

```bash
src/
│
├── feature/
│   ├── Analytics.js
│   ├── PropertyDetail.js
│   └── PropertyExplorer.js
│
├── import/
│   ├── ImportAgent.js
│   ├── ImportLocation.js
│   └── ImportProperty.js
│
├── menu_cli/
│   ├── AgentMenu.js
│   ├── AnalyticsMenu.js
│   ├── LocationMenu.js
│   └── PropertyMenu.js
│
├── models/
│   ├── AgentModel.js
│   ├── LocationModel.js
│   └── PropertyModel.js
│
├── Database.js
└── Formatter.js
```

---

# Database Collections

## Property Collection

```js
{
  _id,
  title,
  price_idr,
  bedrooms,
  bathrooms,
  garage,
  land_size_m2,
  building_size_m2,
  status,
  loc_id,
  agent_id
}
```

---

## Location Collection

```js
{
  _id,
  city,
  district
}
```

---

## Agent Collection

```js
{
  _id,
  name,
  agency_name,
  phone,
  whatsapp,
  email
}
```

---

# MongoDB Concepts Used

## CRUD Operations

* insertOne
* find
* findOne
* updateOne
* deleteOne

---

## Aggregation Pipeline

Project ini menggunakan:

* $lookup
* $unwind
* $group
* $sort
* $bucket
* $set
* $match
* $cond
* $avg
* $sum
* $max
* $min

---

# Validation

Aplikasi memiliki validasi manual untuk:

* Foreign Key Validation
* Positive Number Validation
* Empty Field Validation
* Enum Validation

Contoh:

* agent_id harus ada di collection agent
* loc_id harus ada di collection location
* price tidak boleh negatif

---

# Formatter System

Project menggunakan formatter custom agar output CLI lebih readable.

Contoh:

```txt
1. 6a044eef6f02700570aad267
Title           : Rumah Elite
Price           : 21000000000
Bedrooms        : 8
Bathrooms       : 7
Status          : SOLD
```

---

# Installation

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Install Dependency

```bash
npm install
```

---

## 3. Setup Environment

Buat file `.env`

```env
MONGO_URL=your_mongodb_connection
DB=your_database_name
```

---

## 4. Run Application

```bash
node app.js
```

---

# Dataset

Dataset digunakan untuk:

* Property Data
* Agent Data
* Location Data

Dataset Link:

[https://drive.google.com/drive/folders/15u3DE08zbDCIfTx5QwsdtQAdTFUYl47Y?usp=sharing](https://drive.google.com/drive/folders/15u3DE08zbDCIfTx5QwsdtQAdTFUYl47Y?usp=sharing)

---

# Example Menu

```txt
Jakarta Property Index Menu:
1. Property Explorer
2. Property Detail
3. Market Analytics
4. Data Management
5. Exit
```

---

# Example Analytics Output

```txt
1. Kebayoran Baru
Average Price/m2 : 45000000
Total Listing    : 20
```

---

# Learning Outcome

Project ini melatih:

* MongoDB CRUD
* MongoDB Aggregation
* Data Modeling
* CLI Application Development
* Modular Architecture
* Validation System
* Reusable Formatter
* Separation of Concern

---

# Future Improvement

Beberapa pengembangan yang bisa dilakukan:

* Pagination
* Authentication System
* Export CSV/PDF
* REST API Version
* Frontend Web Version
* Advanced Search
* Dynamic Aggregation Filter
* Recommendation System

---

# Author

Jakarta Property Index Project
Built with Node.js and MongoDB.
