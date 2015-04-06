## Generating sensors instances

From the RDF description of a family of sensors, generate sensors isntance to be used in the game:

```
   jsonld = json.loads(open(SpaceSensors.json))
   
   for e s in jsonld['defines']:
       if s['@type'] == '.../sensors/Sensor':
           generate_sensor_instance(s['@id'])
```   
   
