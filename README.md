API URL: https://web46unit4buildweek.herokuapp.com/

API Documentions:

users:

[GET] /api/users - returns an array filled with user objects: 

```
[
  {
    "user_id": 1,
    "username": "Test"
  }
]
```

(All seeded user passwords should be 123)

Authentication:
|Method|       URL	      |                       Description                                |
| ---- | -----------------| ---------------------------------------------------------------- |
|[POST]|/api/auth/register|	Requires a username, password, market_name. Registers a new user.|
|[POST]|/api/auth/login  	| Requires a username and password. Logs the user in.              |


Users:
|Method|       URL	      |                       Description                                |
| ---- | -----------------| ---------------------------------------------------------------- |
|[GET]	/api/users/       |		Returns an array filled with user objects.|
|[GET]	/api/users/:id	 	| Returns the user object with the specified user_id.            |




items:
|Method|       URL	      |                       Description                                |
| ---- | -----------------| ---------------------------------------------------------------- |
|[GET]|	/api/items/|	Returns an array filled with item objects.|
|[GET]|	/api/items/:id|	Returns the item object with the specified item_id.|
|[POST]|	/api/items/	|Requires: item_name, item_description, item_price (Must be logged in to add an item)|
|[PUT]|	/api/items/:id	|Requires: item_name, item_description, item_price (Must be logged in to edit an item)|
|[DELETE]|	/api/items/:id	|Requires: Must be valid id (Must be logged in to Delete an item)|
(only the market who posted the item can edit/delete it)

[GET] /api/items
```
[
  {
    "item_id": 1,
    "item_name": "Beans - Butter Lrg Lima",
    "item_description": "Nulla justo.",
    "item_price": "10.38",
    "market_id": 1
  },
  {
    "item_id": 2,
    "item_name": "Chutney Sauce",
    "item_description": "Proin eu mi. Nulla ac enim.",
    "item_price": "38.27",
    "market_id": 1
  },
  {
    "item_id": 3,
    "item_name": "Appetizer - Mango Chevre",
    "item_description": "Nunc purus. Phasellus in felis.",
    "item_price": "30.84",
    "market_id": 1
  },
]
``` 
 
[GET] /api/items/:id
```
  {
    "item_id": 1,
    "item_name": "Beans - Butter Lrg Lima",
    "item_description": "Nulla justo.",
    "item_price": "10.38",
    "market_id": 1
  }
```  


Markets:
|Method|       URL	      |                       Description                                |
| ---- | -----------------| ---------------------------------------------------------------- |
|[GET]|	/api/markets/	|Returns an array filled with market objects.|
|[GET]	|/api/markets/:id	|Returns the market object with the specified market_id.|
|[POST]	|/api/markets/	|Requires: market_name (Must be logged in to add a market)|


[GET] /api/markets/
```
[
  {
    "username": "Test",
    "market_name": "Zaam-Dox",
    "market_id": 1
  },
  {
    "username": "Bob",
    "market_name": "Solarbreeze",
    "market_id": 2
  },
]
```

[GET] /api/markets/:id
```
[
{
  "username": "Test",
  "market_name": "Zaam-Dox",
  "market_id": 1,
  "items": [
    {
      "item_id": 1,
      "item_name": "Beans - Butter Lrg Lima",
      "item_description": "Nulla justo.",
      "item_price": "10.38"
    },
    {
      "item_id": 2,
      "item_name": "Chutney Sauce",
      "item_description": "Proin eu mi. Nulla ac enim.",
      "item_price": "38.27"
    }
]
```

