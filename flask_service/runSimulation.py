import pandas as pd
import json,sys
import numpy as np

class SpaceNode:
    def __init__(self,data):
#         print(data)
        self.name = data['spaceName']
        self.area = float(data['area'])
        self.level = int(data['level'])
        self.window = data['window']
        self.occupied = data['occupied']
        self.contains = []
        self.nextElement = None

class DeviceNode:
    def __init__(self,data):
        self.name = data['deviceName']
        self.type = data['type']
        self.placement = data['placement']
        self.networks = data['networks']
        self.visibility = data['visibility']
        self.monitoring = data['monitoring']
        self.nextElement = None
        
class Vertex:
    def __init__(self, node):
        self.id = node.name
        self.data = node
        self.adjacent = {}
        # Set distance to infinity for all nodes
#         self.distance = float('inf')
        self.distance = 100
        # Mark all nodes unvisited        
        self.visited = False  
        # Predecessor
        self.previous = None

    def add_neighbor(self, neighbor, weight=0):
        self.adjacent[neighbor] = weight

    def get_connections(self):
        return self.adjacent.keys()  

    def get_id(self):
        return self.id

    def get_weight(self, neighbor):
        return self.adjacent[neighbor]

    def set_distance(self, dist):
        self.distance = dist

    def get_distance(self):
        return self.distance

    def set_previous(self, prev):
        self.previous = prev

    def set_visited(self):
        self.visited = True

    def __str__(self):
        return str(self.id) + ' adjacent: ' + str([x.id for x in self.adjacent])

class Graph:
    def __init__(self):
        self.vert_dict = {}
        self.num_vertices = 0

    def __iter__(self):
        return iter(self.vert_dict.values())

    def add_vertex(self, node):
        self.num_vertices = self.num_vertices + 1
        new_vertex = Vertex(node)
        self.vert_dict[node.name] = new_vertex # name to vertex mapping
        return new_vertex

    def get_vertex(self, n):
        if n in self.vert_dict:
            return self.vert_dict[n]
        else:
            return None

    def add_edge(self, frm, to, cost = {}):
        if frm not in self.vert_dict:
            self.add_vertex(self.vert_dict[frm])
        if to not in self.vert_dict:
            self.add_vertex(self.vert_dict[to])

        self.vert_dict[frm].add_neighbor(self.vert_dict[to], cost)
        self.vert_dict[to].add_neighbor(self.vert_dict[frm], cost)
        
    def add_directed_edge(self, frm, to):
        if frm not in self.vert_dict:
            self.add_vertex(self.vert_dict[frm])
        self.vert_dict[frm].add_neighbor(self.vert_dict[to])
        
    def get_vertices(self):
        return self.vert_dict.keys()

    def set_previous(self, current):
        self.previous = current

    def get_previous(self, current):
        return self.previous
    
class RunSim:
    def generatePaths(self,u,d):
        res = []
        def dfs(u,d,path):
            u.visited = True

            path.append(u.data.name) 
            # If current vertex is same as destination, then print 
            if u == d: 
    #             print(path)
                res.append(list(path))
            else: 
                # If current vertex is not destination 
                # Recur for all the vertices adjacent to this vertex 
                for i in u.get_connections(): 
                    if i.visited == False:
                        dfs(i, d, path) 

            # Remove current vertex from path[] and mark it as unvisited 
            path.pop() 
            u.visited = False
        dfs(u,d,[])
        return res
    
    def calculate1(self,df_attack,paths,g):
    
        all_paths = []
    
        for path in paths:

    #         breach_time = 0
            breach_difficulty = ""
            attack_type = ""
            result_path = "Outside, "
            breached_node = ""
            breached = False
            for i in range(len(path)):
                curr = path[i]
                device_generic_name = ''.join([i for i in curr if not i.isdigit()]).strip()
                curr_node = g.vert_dict[curr]
                # if the curr node is space node
                if curr_node.data.__class__.__name__ == 'SpaceNode':
                    # check all its connections to see if there is any monitoring device
                    monitored = False
                    # check if the space has windows or is occupied
                    if curr_node.data.window == False or curr_node.data.occupied == True:
                        continue
                    for conn in g.vert_dict[curr].get_connections(): 
                        if conn.data.__class__.__name__ == 'SpaceNode':
                            continue
                        if curr in conn.data.monitoring:
#                             print("monitored")
                            monitored = True
                            break
                    if not monitored:
                        result_path+=curr+" window, "
                        breach_difficulty = "easy"
                        breached_node = curr
                        attack_type = "physical"

                # if the curr node is vulnerable to cyber attack
                elif device_generic_name in df_attack['Attacked device'].values.tolist():
                    df_curr_attack = df_attack[df_attack['Attacked device']==device_generic_name]
                    list_index = []
                    curr_network = curr_node.data.networks
                    for index,row in df_curr_attack.iterrows():
                        if len(set(row['Communication protocol']).intersection(set(curr_network)))>0:
                            list_index.append(index)
                    df_filtered = df_curr_attack[df_curr_attack.index.isin(list_index)]
#                     print(df_filtered)
                    for index,row in df_filtered.iterrows():
    #                     print(row)
                        if row['Constraint'] == 'visibility':
#                             print("visibility")
                            # Laser attack
                            if 'Outside' in curr_node.data.visibility:
                                if row['Testing Device'] in path[i+1:]:
                                    breach_difficulty = row['Attack difficulty']
                                    breached_node = curr
                                    result_path+=curr+", "
                                    attack_type = row['Attack Vector']
                                    for j in range(i+1,len(path)):
                                        result_path+=path[j]+", "
    #                                     breach_time+=5
                                    breached = True
                                    break



                        elif np.isnan(row['Constraint']):
    #                         print("else")
                            breach_difficulty = row['Attack difficulty']
                            breached_node = curr
                            result_path+=curr+", "
                            attack_type = row['Attack Vector']
                            for j in range(i+1,len(path)):
                                result_path+=path[j]+", "
    #                             breach_time+=5
                            breached = True
                            break
                if breached: 
                    break

            if breached_node!="":
                attack_path = breached_node+" : "+breach_difficulty+" : "+ attack_type+" : "+result_path
                if attack_path not in all_paths:
                    all_paths.append(attack_path)
        return all_paths
    
    def tranformAttackPaths(self,data,attack):
        '''
            converts a string of attack path into a graph format which is compatible 
            for D3 force directed graph viz
            input: data(json input graph), attack(string)
            output: output graph (json)
        '''
        
        # assigning groups to differentiate nodes with different colors
        for i in data['Spaces']:
            i['group']='space' if i['spaceName']!='Outside' else 'Outside'
            i['name'] = i['spaceName']

        for i in data['Devices']:
            i['group']='device'
            i['name'] = i['deviceName']

        final = {"vertices":data['Spaces']+data['Devices']}
        # edges represent physical and cyber connections
        edges = []
        # adding all cyber connection
        for i in data['CyberConnections']:
            for j in i['targets']:
                edges.append({'source':j,'target':i['sources'],'distance':30,'group':2})
        # adding all physical connection
        for i in data['PhysicalConnections']:
            edges.append({'source':i['sources'],'target':i['targets'],'distance':30,'group':1})

        # adding all containment connections
        for i in data['Devices']:
            edges.append({'source':i['placement'],'target':i['deviceName'],'distance':15,'group':3})    
            
        # links show attack paths 
        links = []
        # attack string format - "target_node:attack_difficulty:attack_type:attack_path"
        attack_split = attack.split(':')
        path_list = attack_split[-1].strip()[:-1].split(',')
        # for nodes in the attack path adjacent nodes become source and target respectively
        for i in range(len(path_list)-1):
            # if there is a break-in through window, we extract the space name since nodes in graph
            # have space names
            source = path_list[i].split('window')[0].strip()
            target = path_list[i+1].split('window')[0].strip()
#             if "physical" in attack_split[2]:
#                 target = target.split(' ')[0]
            # assigning link distance as 20 (can be experimented with for better viz) 
            # also initializing the attack type only for the first node which has been targeted
            # the attack type will be displayed on the link in the output graph
            links.append({'source':source,'target':target,'distance':20,'group':4,
                          'attack':attack_split[2]+attack_split[1] if i==0 else ''})
            
        # assigning the targeted node which will be highlighted in the graph
        for i in final['vertices']:
            if i['name'] == attack_split[0].strip():
                i['attacked']=True
            else:
                i['attacked']=False
        final['edges']=edges

        final['links']=links
        return final
    
    def main(self,data):
        
        g = Graph()
        # create space vertices
        for s in data['Spaces']:
            g.add_vertex(SpaceNode(s))


        # add space connections
        for pc in data['PhysicalConnections']:
            g.add_edge(pc['sources'],pc['targets'],pc)

        # create device vertices
        for d in data['Devices']:
            g.add_vertex(DeviceNode(d))


        # add device connections
        for cc in data['CyberConnections']:
            for target in cc['targets']:
                g.add_directed_edge(cc['sources'],target)
        
        # add edges between devices and spaces by checking where they are placed
        for d in data['Devices']:
            g.add_directed_edge(d['placement'],d['deviceName'])
            
        # reads the excel file in the current folder
        df_attack = pd.read_excel('attack_models.xls',sheet_name='Sheet2')
        
        # splits multiple values and converts it into a list
        df_attack['Communication protocol'] = df_attack['Communication protocol'].map(lambda x: x.split(','))
        df_attack['Smart home solution'] = df_attack['Smart home solution'].map(lambda x: x.split(','))
        
        # not taking outside node into consideration
        vertices = [v for v in g if v.data.name!='outside']
        candidate_paths = []
        # for every combination of start and end nodes generate path. 
        # TODO: logic can be improved 
        for v in vertices:
            for u in vertices:
                temp = self.generatePaths(u,v)
                if temp: candidate_paths.extend(temp)
        return {'attacks':self.calculate1(df_attack,candidate_paths,g)}