import random
import json

subsystems = dict({
    "communication" : {
        "slug": "COM",
        "ontology": "http://ontology.projectchronos.eussubsystems/Spacecraft_Communication",
        "power": {"min": -200, "max": -1},
        "mass": {"min": 30, "max": 100},
        "cost": {"min": 1000, "max": 10000},
        "minWorkingTemp": { "min": -40, "max": -20 },
        "maxWorkingTemp": { "min": 40, "max": 90 },
        "description": "Any scientific instrument carried by a space probe or an artificial satellite",
        "extended": "A space detector is a sensor supported by another device that let it collect data, that is deployed into a spacecraft and works outside Earth lower atmosphere"
    },
    "propulsion" : {
        "slug": "PROP",
        "ontology": "http://ontology.projectchronos.eu/subsystems/Spacecraft_Propulsion",
        "power": {"min": -200, "max": -50},
        "mass": {"min": 10, "max": 100},
        "cost": {"min": 5000, "max": 25000},
        "minWorkingTemp": { "min": -30, "max": -10 },
        "maxWorkingTemp": { "min": 20, "max": 80 },
        "description": "The set of subsystems needed to make a spacecraft moving in space",
        "extended": "Complex devices-subsystems used for impelling (processes of applying a force which results in translational motion) a spacecraft, in the specific http://umbel.org/umbel/rc/ProjectilePropelling"
    },
    "detector" : {
        "slug": "DTR",
        "ontology": "http://ontology.projectchronos.eu/subsystems/Spacecraft_Detector",
        "power": {"min": -100, "max": -10},
        "mass": {"min": 50, "max": 400},
        "cost": {"min": 2000, "max": 15000},
        "minWorkingTemp": { "min": -30, "max": -10 },
        "maxWorkingTemp": { "min": 20, "max": 80 },
        "description": "Any scientific instrument carried by a space probe or an artificial satellite",
        "extended": "A space detector is a sensor supported by another device that let it collect data, that is deployed into a spacecraft and works outside Earth lower atmosphere"
    },
    "primary power" : {
        "slug": "PPW",
        "ontology": "http://ontology.projectchronos.eu/subsystems/Spacecraft_PrimaryPower",
        "power": {"min": 200, "max": 2000},
        "density" : 1.5,
        "mass": {"min": 30, "max": 100},
        "cost": {"min": 2000, "max": 10000},
        "minWorkingTemp": { "min": -60, "max": -40 },
        "maxWorkingTemp": { "min": 50, "max": 100 },
        "description": "The set of subsystems needed to make a spacecraft to collect energy to operate",
        "extended": "Complex devices-subsystems used for collecting energy."
    },
    "backup power" : {
        "slug": "BCK",
        "ontology": "http://ontology.projectchronos.eu/subsystems/Spacecraft_BackupPower",
        "power": {"min": 50, "max": 1500},
        "density": 2,
        "mass": {"min": 100, "max": 300},
        "cost": {"min": 5000, "max": 25000},
        "minWorkingTemp": { "min": -30, "max": -10 },
        "maxWorkingTemp": { "min": 20, "max": 80 },
        "description": "The set of subsystems needed to make a spacecraft to store energy from the primary power source.",
        "extended": "The set of subsystems needed to make a spacecraft to store energy from the primary power source."
    },
    "thermal" : {
        "slug": "THR",
        "ontology": "http://ontology.projectchronos.eu/subsystems/Spacecraft_Thermal",
        "power": {"min": -100, "max": 100},
        "mass": {"min": 20, "max": 150},
        "cost": {"min": 500, "max": 4000},
        "minTemperature": { "min": -100, "max": -30 },
        "maxTemperature": { "min": 50, "max": 100 },
        "description": "Artifacts or devices used to maintain the temperature of spacecraft's subsystems and payloads into a given range, to permit nominal and survival mode for all the duration of the mission .",
        "extended": "Shields, shells or any device insulation from/reflecting radiation exploiting emission and absorption events"
    },
    "structure" : {
        "slug": "STR",
        "ontology": "http://ontology.projectchronos.eu/subsystems/Spacecraft_Structure",
        "mass": {"min": 10, "max": 100},
        "cost": {"min": 2000, "max": 35000},
        "minWorkingTemp": { "min": -90, "max": -30 },
        "maxWorkingTemp": { "min": 30, "max": 70 },
        "description": "Artifacts or rigid devices used to create a supporting structure for all the others devices.",
        "extended": "It's the skeleton and framework of the spacecraft."
    },
    "command and data" : {
        "slug": "CDH",
        "ontology": "http://ontology.projectchronos.eu/subsystems/Spacecraft_CDH",
        "power": {"min": -50, "max": -5},
        "mass": {"min": 20, "max": 70},
        "cost": {"min": 1000, "max": 5000},
        "minWorkingTemp": { "min": -20, "max": -10 },
        "maxWorkingTemp": { "min": 10, "max": 50 },
        "description": "Command and Data Handling, it is the device that connects the other devices, it processes and deliver information.",
        "extended": "The DH system shall: Enable HK and science data flow \u2013 Housekeeping data (Temperatures, Pressures, Voltages, Currents, Status,...) \u2013 Attitude data \u2013 Payload data (e.g., Science data) - Receive and distribute commands - Perform TM and TC protocols - Distribute timing signals - Synchronization of data \u2013 Time stamping of data - Provide data storage - Execute commands and schedules - Control subsystems and payloads - Monitor spacecraft health - Make autonomous decisions - Perform data compression."
    },
    "attitude and orbit control" : {
        "slug": "AODCS",
        "ontology": "http://ontology.projectchronos.eu/subsystems/Spacecraft_AODCS",
        "power": {"min": -150, "max": 100},
        "mass": {"min": 10, "max": 80},
        "cost": {"min": 1000, "max": 15000},
        "minWorkingTemp": { "min": -50, "max": -30 },
        "maxWorkingTemp": { "min": 30, "max": 70 },
        "active": ["magnetic torque", "cold gas", "microthrusters"],
        "passive": ["rotation", "gravity", "solar pressure"],
        "description": "Complex devices-subsystems used to set the direction and the position of the spacecraft, it controls flight dynamics.",
        "extended": "Attitude and Orbit Determination Control"
    }
})

def randomValue(interval):
    """
    Generates a random integer value from a given interval
    """
    if not isinstance(interval, dict):
        raise ValueError('value has to be dict')
    return random.randrange(interval['min'], interval['max'], 1) // 1

def linearFunction():
    pass


def generateObject(name, subsystem):
    """
    Generates random components from given input dictionary
    """
    result = {}
    result['mass'] = randomValue(subsystem['mass'])
    result['category'] = name
    result['description'] = subsystem['description']
    result['extended'] = subsystem['extended']
    if 'minWorkingTemp' in subsystem.keys(): # general rule
        if not name == 'structure':
            result['power'] = randomValue(subsystem['power'])   
        result['minWorkingTemp'] = randomValue(subsystem['minWorkingTemp'])
        result['maxWorkingTemp'] = randomValue(subsystem['maxWorkingTemp'])
        if 'density' in subsystem.keys():  # rule power or battery
            result['volume'] = int(result['mass'] / subsystem['density']) // 1        
            if name == 'primary power':
                result['cost'] = result['power'] * 5
                return result
            elif name == 'backup power':
                result['cost'] = result['power'] * 16
                return result
        else:    # rule for other not generator
            result['volume'] = result['mass'] + randomValue({'min': -5, 'max': 5})
            if name not in ['structure', 'attitude and orbit control']:
                if name == 'detector':
                    result['type'] = random.choice(['interferometer', 'spectrometer', 'photometer', 'optical', 'dust detector'])

                result['cost'] = randomValue(subsystem['cost'])
                return result
            else:
                if name == 'structure':
                    result['power'] = 0  
                    result['cost'] = int(350000 / result['mass']) // 1
                    return result
                elif name == 'attitude and orbit control':
                    if result['power'] > 0:
                        result['power'] = 0 
                        result['type'] = 'passive'
                        result['mechanism'] = random.choice(subsystem['passive'])
                    else:
                        result['type'] = 'active'
                        result['mechanism'] = random.choice(subsystem['active'])
                    result['cost'] = randomValue(subsystem['cost'])
                    return result

    else: # rule for thermal
        result['volume'] = result['mass'] + randomValue({'min': -5, 'max': 5})
        result['power'] = randomValue(subsystem['power'])
        if result['power'] > 0 : result['power'] = 0 
        result['minTemperature'] = randomValue(subsystem['minTemperature'])
        result['maxTemperature'] = randomValue(subsystem['maxTemperature'])

        result['cost'] = result['maxTemperature'] - result['minTemperature'] * 20

        if result['power'] == 0:
            result['type'] = 'passive'
        else:
            result['type'] = 'active'
        return result

output = []
i = 0
for i in range(0, 3):
    for k, v in subsystems.items():
        # print(k)
        name = str(random.randrange(0, 50)) + str(random.choice(['T', 'W', 'KV', 'JFG'])) + ' ' + k
        obj = {}
        obj['name'] = name
        obj['id'] = i + 1
        obj['object'] = generateObject(k, v)
        output.append(obj)
        i += 1
    
print(json.dumps(output, indent=4))



            



