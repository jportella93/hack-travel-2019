Example API request:
```
curl -X POST \
  http://localhost:8080/flights \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"flyFrom": ["BCN", "GVA", "LHR"],
	"dateFrom": "15/04/2019",
	"dateTo": "18/04/2019"
}'
```

[Will generate this response](./mockResponse.json)

