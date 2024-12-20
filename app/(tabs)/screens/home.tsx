import { Image, StyleSheet, Platform , View ,Text ,Pressable , ScrollView , RefreshControl ,  useColorScheme ,}from 'react-native';
import { StretchInY } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState , useEffect } from 'react'
import { Loading } from './loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



export default function HomeScreen({ navigation }) {
  
  const [refresh , setRefresh] =useState(false);
  const [tofayD , setToday] = useState([]);
  const [ tab , setTab ] = useState(false);
  const [data, setData] = useState([]);
  const [textColor , setTextColor] = useState('');
  const[loading , setLoadig]= useState(false);

const getData = async () => {
  setLoadig(true)
      try {
        
    
        const note = await AsyncStorage.getItem('allData');
        setData( note != null ? JSON.parse(note) : null);
        setLoadig(false)
    
      } catch (e) {
        console.log('Veriyi alma hatası: ', e);
      }
    };


  useEffect(()=>{
    
    getData()

    if (colorScheme == "dark"){
      setTextColor('black')
    }else{
      setTextColor('white')
    }
  },[]);

  function today(){
    setTab(true);
    getTodayData();
  }

  function calendar(){
    setTab(false);
    getData();
    
  };

  const getTodayData = async () => {
    try {
      // Tüm veriyi al
      const existingData = await AsyncStorage.getItem('allData');
      let dataArray = [];
  
      // Eğer veri varsa, JSON'a parse et
      if (existingData) {
        try {
          dataArray = JSON.parse(existingData);
          if (!Array.isArray(dataArray)) {
            dataArray = [];
          }
        } catch (error) {
          console.log('JSON parse hatası:', error);
        }
      }
  
      // Bugünün tarihini "14 Nov 24" formatında al
      const today = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      });
  
      // Verileri filtrele (date alanı bugünün tarihi ile eşleşenleri al)
      const todayData = dataArray.filter(item => item.tarih === today);
  
      console.log('Bugünün verileri:', todayData);
      setToday(todayData);
      

    } catch (e) {
      console.log('Verileri alma hatası: ', e);
    }
  };
  
  




console.log(data)

const colorScheme = useColorScheme(); 



  return (
    <View style={colorScheme === 'dark' ? styles.mainDark : styles.main} >
        
        
         <View style={styles.head2} >
            <Text style={[colorScheme === 'dark' ? {fontWeight:"bold" , fontSize:32 , marginLeft:"9%" , color:"#BFD1E5"  } : {fontWeight:"bold" , fontSize:32 , marginLeft:"9%" ,color:"#2F2F2F"  }]} >Planner</Text> 
            <View style={{flex:1 , alignItems:"flex-end"}} >

            <MaterialCommunityIcons 
            onPress={() => navigation.navigate('auth')}
            style={{marginRight:"9%"}} name="account-circle-outline" size={45} color={colorScheme === 'dark' ? "#BFD1E5" : "#2F2F2F"} />

            </View>

          </View>

      <View style={styles.head} >


      <Pressable
       onPress={today}
      style={[styles.tabs, tab ? styles.true : styles.false]} ><Text
      style={[styles.tabTx,  tab ? [styles.tabTx , {color:"black"}] : colorScheme === 'dark' ? [styles.tabTx , {color:"white"}]  : [styles.tabTx , {color:"black"}] ]}
      >TODAY</Text></Pressable>


      <Pressable 
      onPress={calendar}
      style={[styles.tabs, tab ? styles.false : styles.true]} ><Text
      style={[styles.tabTx,  tab ? colorScheme === 'dark' ? [styles.tabTx , {color:"white"}]  : [styles.tabTx , {color:"black"}] : [styles.tabTx , {color:"black"}] ]}
      >CALENDAR</Text></Pressable>


     
      


      </View>

    
      

    {
       tab ? <ScrollView
       style={{flex:1}}
       refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getTodayData} /> }
       >
       { loading ? <Loading renk={"black"} /> : <ScrollView
       style={{flex:1}}
       refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getTodayData} /> }
       >
     {tofayD.map((value)=>{
       return(
         <ScrollView 
         key={value.id}
         style={{flex:1}}
       refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getTodayData} /> }
         contentContainerStyle={styles.scroll} >
     

         <Pressable style={styles.data} 
           onPress={() => navigation.navigate('Day' , value)}
           >
     
             <View style={styles.datatexView} >
     
             <Text  style={[styles.dataTex , {color:"#EFBA19"}]} >{value.tarih}</Text>
             <Text  style={[styles.dataTex , {color:"#EFBA19"}]}>{value.baslik}</Text>
             </View>



             <View style={[styles.datatexView]} >
             <Text  style={[styles.dataTex , {color:"#ffede6"}]}>{value.time}</Text>
             <Text  style={[styles.dataTex , { fontSize:20 , color:"#F8E099" , fontWeight:"normal" ,fontStyle:"italic"}]} >{value.not}</Text>
             </View>
             
             </Pressable>
     
     
           
           </ScrollView>
       )
     })}
   </ScrollView>
} 
      </ScrollView> : <ScrollView
       style={{flex:1}}
      refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getData} /> }
      >
       { loading ? <Loading renk={"black"} /> : <ScrollView
      contentContainerStyle={{flex:1 ,justifyContent:"center" }}
        refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getData} /> }
       >


     {data.map((value)=>{
      
       return(
         <ScrollView 
         key={value.id}
         style={{flex:1}}
       refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getData} /> }
       showsVerticalScrollIndicator={false}
         contentContainerStyle={styles.scroll} >
     

         <Pressable style={styles.data} 
           onPress={() => navigation.navigate('Day' , value)}
           >
     
             <View style={styles.datatexView} >
     
             <Text  style={[styles.dataTex , {  color:"#EFBA19"}]} >{value.tarih}</Text>
             <Text  style={[styles.dataTex , {  color:"#EFBA19" }]}>{value.baslik}</Text>
             </View>



             <View style={[styles.datatexView]} >
             <Text  style={[styles.dataTex , {color:"#ffede6"}]}>{value.time}</Text>
             <Text  style={[styles.dataTex , { fontSize:20 , color:"#F8E099" , fontWeight:"normal" ,fontStyle:"italic"}]} >{value.not}</Text>
             </View>
             
             </Pressable>
     
            
           
           </ScrollView>
           
       )
     })}
     
   </ScrollView>
} 
      </ScrollView>
    }
      <Pressable 
      onPress={() => navigation.navigate('Add')}
      style={{position: 'absolute',
    top: '80%',
    left: '32.5%',
    width: "35%",
    height: "7%",
    backgroundColor: '#BFD1E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:44,
    flexDirection:"row",
    zIndex: 999,}} >
      

        <Ionicons name="add-circle-outline" size={35} color={"black"}  />
        <Text style={{fontWeight:"bold" , fontSize:15 , marginLeft:"4%" , color:"black"  }} >ADD PLAN</Text> 

      </Pressable>

    </View>
    
  );
}

const styles = StyleSheet.create({
    main:{
    flex:1 ,
     borderWidth:0 ,
     alignItems:"center",
     justifyContent:"center",
     backgroundColor:"#EBEBEB"
     },
     mainDark:{
      flex:1 ,
       borderWidth:0 ,
       alignItems:"center",
       backgroundColor:"#0F0F0F"
       },


  head:{
    width:"100%",
    height:"10%",
    flexDirection:"row", 
   
    alignItems:"center",
    justifyContent:"center",
   
    borderRadius:16
  },
  head2:{
    width:"100%",
    height:"10%",
    flexDirection:"row", 
   
    alignItems:"center",
 
   
    borderRadius:16
  },
  image:{

  },

  tabs:{
    borderWidth:0,
    marginLeft:16,
    height:"60%",
    justifyContent:"center",
    borderRadius:41,
    width:150,
    alignItems:"center",
   
  },

  true:{
    borderWidth:0,
    marginLeft:16,
    height:"60%",
    justifyContent:"center",
    borderRadius:41,
    width:150,
    alignItems:"center",
    backgroundColor:"#BFD1E5",

  },
  false:{
    borderWidth:1,
    marginLeft:16,
    height:"60%",
    justifyContent:"center",
    borderRadius:41,
    width:150,

    alignItems:"center",
    borderColor:"white"
   
  },

  
  month:{
    flexDirection:"row", 
    borderWidth:0,
    width:"100%",
    height:"5%",
    alignItems:"center",
    justifyContent:"center"},
    monthTex:{
      
      marginLeft:16,
      height:"60%",
      justifyContent:"center",
      borderRadius:16,
      width:80,
      alignItems:"center"

    },
    scroll:{
      width:460,
      alignItems:"center",
      borderWidth:0,
      
      
    },

    data:{
      backgroundColor:"#00204C",
      borderWidth:0,
      width:"89%",
      height:150,
      marginBottom:18,
      borderRadius:41,
       
      justifyContent:"center",
      alignItems:"flex-start",
      marginRight:"4%"
      
    },
    dataTex:{
      width:"auto",
      fontSize:35,
      marginLeft:"8%",
     
      fontWeight:"bold",
      color:"#8ca87c"
    },
    datatexView:{
      marginLeft:"5%",
      flexDirection:"row",
      alignItems: "center",
     justifyContent:"center",

    },
    add:{
      height:60,
      width:60,
     
      alignItems:"center",
      justifyContent:"center",
   
      
    },
    tabTx:{
      fontWeight:"bold",
      
     
    }
    
  
});
