const SpaceNode = require('./model/SpaceNode.js');
const DeviceNode = require('./model/DeviceNode.js');
const LinkedList = require('./LinkedList.js');

const data = {
    "Spaces": [
        {
            "id": "outside",
            "spaceName": "outside",
            "area": "1",
            "level": "1"
        },
        {
            "id": "room1",
            "spaceName": "bedroom1",
            "area": "1.2",
            "level": "1"
        },
        {
            "id": "room2",
            "spaceName": "bedroom2",
            "area": "1.5",
            "level": "1"
        },
        {
            "id": "livingroom",
            "spaceName": "livingroom",
            "area": "2",
            "level": "1"
        }
    ],
    "Devices": [
        {
            "deviceName": "dv1",
            "type": "type2",
            "placement": "bedroom2",
            "networks": [
                "WIFI",
                "Google"
            ],
            "visibility": []
        },
        {
            "deviceName": "dv2",
            "type": "type2",
            "placement": "bedroom1",
            "networks": [
                "WIFI",
                "Google"
            ],
            "visibility": []
        }
    ],
    "PhysicalConnections": [
        {
            "connectionName": "pc_1",
            "sources": "bedroom1",
            "targets": "bedroom2",
            "type": "door",
            "lock": "one sided",
            "id": ""
        },
        {
            "connectionName": "pc_2",
            "sources": "bedroom1",
            "targets": "livingroom",
            "type": "door",
            "lock": "one sided",
            "id": ""
        }
    ],
    "CyberConnections": [
        {
            "cyberConnectionName": "cc_1",
            "sources": "dv1",
            "targets": [
                "dv1"
            ],
            "networks": "WIFI",
            "securityTypes": "Amazon",
            "securityLevel": "weak",
            "id": ""
        }
    ]
}

// const data = {
//     "Spaces": [
//         {
//             "id": "room",
//             "spaceName": "room",
//             "area": "1",
//             "level": "1"
//         },
//         {
//             "id": "room2",
//             "spaceName": "room2",
//             "area": "2",
//             "level": "1"
//         }
//     ],
//     "Devices": [
//         {
//             "deviceName": "dv1",
//             "type": "type2",
//             "placement": "room2",
//             "networks": [
//                 "WIFI",
//                 "Google"
//             ],
//             "visibility": []
//         }
//     ],
//     "PhysicalConnections": [
//         {
//             "connectionName": "pc_1",
//             "sources": "room",
//             "targets": "room",
//             "type": "door",
//             "lock": "one sided",
//             "id": ""
//         }
//     ],
//     "CyberConnections": [
//         {
//             "cyberConnectionName": "cc_1",
//             "sources": "dv1",
//             "targets": [
//                 "dv1"
//             ],
//             "networks": "WIFI",
//             "securityTypes": "Amazon",
//             "securityLevel": "weak",
//             "id": ""
//         }
//     ]
// }


function printGraph(list) {
    console.log(">>Adjacency List of Directed Graph<<");
    var i;
    Object.keys(list).forEach(key => {
        process.stdout.write("|" + String(key) + "| => ");
        let temp = list[key].getHead();
        while (temp != null) {
            process.stdout.write("[" + String(temp.name) + "] -> ");
            temp = temp.nextElement;
        }
        console.log("null");
    });
    
  };
class Graph{
    constructor() {
        this.edges = {};
        this.nodes = [];
     }
  
     addNode(node) {
        this.nodes.push(node);
        this.edges[node.name] = [];
     }
  
     addEdge(node1, node2, weight = 1) {
        this.edges[node1.name].push({ node: node2, weight: weight });
        this.edges[node2.name].push({ node: node1, weight: weight });
     }
  
     addDirectedEdge(node1, node2, weight = 1) {
        this.edges[node1.name].push({ node: node2, weight: weight });
     }
     display() {
        let graph = "";
        this.nodes.forEach(node => {
           graph += node.name + "->" + this.edges[node.name].map(n => n.node.name).join(", ") + "\n";
        });
        console.log(graph);
     }
}
let g = new Graph();
let node_dict = {};
// adding space nodes
data['Spaces'].forEach(space => {
    // console.log(space);
    let temp = new SpaceNode(space);
    g.addNode(temp)
    node_dict[space.spaceName] = temp;
});
// adding physical connections as edges
data['PhysicalConnections'].forEach(pconn => {
    g.addDirectedEdge(node_dict[pconn['sources']],node_dict[pconn['targets']]);
});

let h = new Graph();
// adding device nodes
data['Devices'].forEach(device => {
    // update contains
    let temp = new DeviceNode(device);
    h.addNode(temp);
    node_dict[device.deviceName] = temp;
    node_dict[device['placement']].contains.push(temp);
});
// creating cyber connections as edges
data['CyberConnections'].forEach(cconn => {
    cconn.targets.forEach(target => {
        h.addDirectedEdge(node_dict[cconn['sources']],node_dict[target]);
    });
    
});

g.display();
h.display();