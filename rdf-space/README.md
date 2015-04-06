## Loads Destinations

Use the RDF description of bodies in the Solar System as destinations:

```
   jsonld = json.loads(open(SolarSystem.json))
   
   for s in jsonld['defines']:
       if "chronos:distance" in s.keys():
           generate_destination_instances(s['@id'])
           
   def generate_destination_instance(url):
      """ Prints a json containing a destination that can be used by the UI. """
      pass
        
```   


## Generating sensors instances

From the RDF description of a family of sensors, generate sensors isntances to be used in the game:

```
   jsonld = json.loads(open(SpaceSensors.json))
   
   for s in jsonld['defines']:
       if s['@type'] == '.../sensors/Sensor':
           generate_sensor_instances(s['@id'])
           
   def generate_sensor_instances(url):
      """ From a sensor's family jsonld representation, prints a set of sensors instances that belongs to
        the given family (3 per family). Using random values from given intervals to define characteristics
        of the instance. """
      pass
        
```   
   
## Generating subsystems instances

From the RDF description of a family of subsystems, generate subsystems isntances to be used in the game:

```
   jsonld = json.loads(open(SubSystems.json))
   
   for s in jsonld['defines']:
       if s['@type'] == 'http://www.w3.org/2002/07/owl#Class':
           if s['rdfs:label'] not in ['Spacecraft_AODCS', 'Spacecraft_Thermal']:  # exclude active/passive superclasses
               generate_subsystem_instances(s['@id'])
           
   def generate_subsystems_instances(url):
      """ From a subsystem's family jsonld representation, prints a set of subsystems instances that belongs to
        the given family (5 per family). Using random values from given intervals to define characteristics
        of the instance. """
      pass
        
```   