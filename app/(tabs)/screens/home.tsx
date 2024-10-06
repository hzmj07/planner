import { Image, StyleSheet, Platform , View ,Text ,Pressable , ScrollView , RefreshControl}from 'react-native';
import { StretchInY } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState , useEffect } from 'react'
import { Loading } from './loading';
import Ionicons from '@expo/vector-icons/Ionicons';




export default function HomeScreen({ navigation }) {
  
  const [refresh , setRefresh] =useState(false);
  const [tofayD , setToday] = useState([]);
  const [ tab , setTab ] = useState(false);
  const [data, setData] = useState([]);
  const[loading , setLoadig]= useState(false);
const getData = async () => {
      try {
        
    
        const note = await AsyncStorage.getItem('allData');
        setData( note != null ? JSON.parse(note) : null);
    
      } catch (e) {
        console.log('Veriyi alma hatası: ', e);
      }
    };
  useEffect(()=>{
    
    getData()
    
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



  return (
    <View style={styles.main} >


      <View style={styles.head} >


      <Pressable
       onPress={today}
      style={[styles.tabs, tab ? styles.true : styles.false]} ><Text
      style={styles.tabTx}
      >TODAY</Text></Pressable>


      <Pressable 
      onPress={calendar}
      style={[styles.tabs, tab ? styles.false : styles.true]} ><Text
      style={styles.tabTx}
      >CALENDAR</Text></Pressable>



      <Pressable 
      onPress={() => navigation.navigate('Add')}
      style={styles.add} >

        <Ionicons name="add-circle-outline" size={55} color="#414b3b" />
      </Pressable>


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
         style={{flex:1}}
       refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getTodayData} /> }
         contentContainerStyle={styles.scroll} >
     

         <Pressable style={styles.data} 
           onPress={() => navigation.navigate('Day' , value)}
           >
     
             <View style={styles.datatexView} >
     
             <Text  style={[styles.dataTex , {width:"auto" , fontSize:35}]} >{value.tarih}</Text>
             <Text  style={[styles.dataTex , {width:"auto" ,  fontSize:35}]}>{value.baslik}</Text>
             </View>



             <View style={[styles.datatexView]} >
             <Text  style={[styles.dataTex , {width:"auto"  , fontSize:35}]}>{value.time}</Text>
             <Text  style={[styles.dataTex , {width:"auto" , fontSize:20 }]} >{value.not}</Text>
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
       style={{flex:1}}
        refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getData} /> }
       >
     {data.map((value)=>{
       return(
         <ScrollView 
         style={{flex:1}}
       refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getData} /> }

         contentContainerStyle={styles.scroll} >
     

         <Pressable style={styles.data} 
           onPress={() => navigation.navigate('Day' , value)}
           >
     
             <View style={styles.datatexView} >
     
             <Text  style={[styles.dataTex , {width:"auto" , fontSize:35}]} >{value.tarih}</Text>
             <Text  style={[styles.dataTex , {width:"auto" ,  fontSize:35}]}>{value.baslik}</Text>
             </View>



             <View style={[styles.datatexView]} >
             <Text  style={[styles.dataTex , {width:"auto"  , fontSize:35}]}>{value.time}</Text>
             <Text  style={[styles.dataTex , {width:"auto" , fontSize:20 }]} >{value.not}</Text>
             </View>
             
             </Pressable>
     
     
           
           </ScrollView>
       )
     })}
   </ScrollView>
} 
      </ScrollView>
    }
     
    </View>
    
  );
}

const styles = StyleSheet.create({
  main:{
    flex:1 ,
     borderWidth:0 ,
     alignItems:"center",
     backgroundColor:"white"
     },


  head:{
    width:"100%",
    height:"10%",
    flexDirection:"row", 
    borderWidth:0,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:26,
    marginTop:26
  },
  tabs:{
    borderWidth:0,
    marginLeft:16,
    height:"60%",
    justifyContent:"center",
    borderRadius:41,
    width:150,
    alignItems:"center",
    backgroundColor:"#8ca87c",
  },

  true:{
    borderWidth:0,
    marginLeft:16,
    height:"60%",
    justifyContent:"center",
    borderRadius:41,
    width:150,
    alignItems:"center",
    backgroundColor:"#8ca87c",

  },
  false:{
    borderWidth:0.4,
    marginLeft:16,
    height:"60%",
    justifyContent:"center",
    borderRadius:41,
    width:150,
    alignItems:"center",
    backgroundColor:"white",
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
      backgroundColor:"#414b3b",
      borderWidth:0,
      width:"95%",
      height:150,
      marginBottom:18,
      borderRadius:41,
       
      justifyContent:"center",
      alignItems:"flex-start",
      marginRight:5
      
    },
    dataTex:{
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
      height:"60%",
      width:60,
     
      alignItems:"center",
      justifyContent:"center",
      marginLeft:16
      
    },
    tabTx:{
      fontWeight:"bold"
    }
    
  
});
