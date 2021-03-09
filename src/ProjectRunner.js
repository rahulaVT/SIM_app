const SpaceNode = require('./model/SpaceNode.js');
const DeviceNode = require('./model/DeviceNode.js');
const LinkedList = require('./LinkedList.js');
const Queue = require("./Queue.js");

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
            "deviceName": "Nest WIFI",
            "type": "central control",
            "placement": "livingroom",
            "networks": [
                "WIFI",
                "Google"
            ],
            "visibility": ["outside"]
        },
        {
            "deviceName": "Nest X Yale Lock",
            "type": "controlled",
            "placement": "livingroom",
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
        },
        {
            "connectionName": "pc_3",
            "sources": "bedroom2",
            "targets": "livingroom",
            "type": "door",
            "lock": "one sided",
            "id": ""
        }
    ],
    "CyberConnections": [
        {
            "cyberConnectionName": "cc_1",
            "sources": "Nest X Yale Lock",
            "targets": [
                "Nest WIFI"
            ],
            "networks": "WIFI",
            "securityTypes": "Google",
            "securityLevel": "medium",
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
     BFS(node) {
        let q = new Queue(this.nodes.length);
        let explored = new Set();
        q.enqueue(node);
        explored.add(node);
        while (!q.isEmpty()) {
           let t = q.dequeue();
           console.log(t);
           if(this.edges[t.name]){
           this.edges[t.name].filter(n => !explored.has(n)).forEach(n => {
              explored.add(n);
              q.enqueue(n);
           });
        }
        }
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
    if (pconn.lock === "one sided"){
        g.addDirectedEdge(node_dict[pconn['sources']],node_dict[pconn['targets']])
    }
    else{
        g.addEdge(node_dict[pconn['sources']],node_dict[pconn['targets']])
    }
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

let breach_time = {"Nest X Yale Lock":30, "hubvoice control":30}
let attack_type = {"central control":"hubvoice control"};


let path = ""
h.nodes.forEach(device => {
    if(device.visibility){
        // an attack can pe performed
        device.visibility.forEach(visible_from => {
            // try different attacks
            if(attack_type[device.type]){
                // console.log(device.type);
                path += visible_from+ ": "+ breach_time[attack_type[device.type]] + ": "+ device.name
            }

        });
        // check with other devices the breached device is connected to
        // if(h.edges[device.name]){
        //     console.log(h.edges[device.name]);
        // }
    }
});

g.display();
h.display();
console.log(path);
// h.BFS(node_dict['bedroom1']);