import { Image, StyleSheet, Platform , View ,Text ,Pressable , ScrollView , RefreshControl ,  useColorScheme ,Button }from 'react-native';
import {  getFirestore, collection, query, where, getDocs , doc ,deleteDoc} from "firebase/firestore"; 
import React, { useState , useEffect, version } from 'react'
import { Loading } from '../loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth ,signOut } from "firebase/auth";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import app from "../../../../firebaseConnect"
import Modal from "react-native-modal";

export default function OnlineHome({ navigation }) {
  
  const [refresh , setRefresh] =useState(false);
  const [tofayD , setToday] = useState([]);
  const [ tab , setTab ] = useState(false);
  const [data, setData] = useState([]);
  const [textColor , setTextColor] = useState('');
  const[loading , setLoadig]= useState(false);
  const [veriyok0 , set0] =useState(false);
  const [veriyok1 , set1] =useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const db = getFirestore(app);
  const auth = getAuth();
  const signedUD = auth.currentUser?.uid;
  const userName = auth.currentUser?.email?.split("@")[0];


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };  

    function formatDate(inputDate) {
      const date = new Date(inputDate); // Stringi Date nesnesine çevir
    
      const day = String(date.getDate()).padStart(2, '0'); // Gün, iki haneli
      const month = date.toLocaleString('en-US', { month: 'short' }); // Kısa ay ismi
      const year = String(date.getFullYear()).slice(-2); // Yılın son iki hanesi
    
      return `${day} ${month} ${year}`; // İstenen formatta döndür
    }


    async function logout(){
       await signOut(auth).then(() => {
          console.log("log out");
          navigation.navigate('auth')
        }).catch((error) => {
          console.error(error)
        });
    }
  const getData = async () => {
    setLoadig(true);
  
    const allData = []; // Tüm veriler için bir dizi oluşturuyoruz
  
    try {
      const postsRef = query(collection(db, 'data'), where('uid', '==', signedUD));
      const querySnapshot = await getDocs(postsRef);
  
      querySnapshot.forEach((doc) => {
        const veri = { ...doc.data(), id: doc.id };
        allData.push(veri); // Veriyi dizide topluyoruz
      });
  
      if(Object.keys(allData).length === 0){
      
        console.log("bugüne ait veri yok");
        setData([]);
        setToday([]);
        setLoadig(false);
        set1(true);
      }else{
        setData(allData);
        setLoadig(false)
        console.log("veri eklendi");
        set1(false)
      }

    } catch (error) {
      console.error('Veri çekilirken hata oluştu:', error);
      setLoadig(false);
    }
  };
  


  useEffect(()=>{
    
   
    getData();
    getTodayData();
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
     getData();
     
    
    const today = formatDate(new Date());
    console.log(today)
       
    const bugüne_aitveri = data.filter(item => item.tarih === today);
    if(Object.keys(bugüne_aitveri).length === 0){
      
      console.log("bugüne ait veri yok");
      set0(true)
    }else{
      setToday(bugüne_aitveri);
      console.log("veri eklendi");
      set0(false);
    }
   
    
   
  };
  
  






const colorScheme = useColorScheme(); 



  return (
    <View style={colorScheme === 'dark' ? styles.mainDark : styles.main} >
        
        
         <View style={styles.head2} >
            <Text style={[colorScheme === 'dark' ? {fontWeight:"bold" , fontSize:32 , marginLeft:"9%" , color:"#BFD1E5"  } : {fontWeight:"bold" , fontSize:32 , marginLeft:"9%" ,color:"#2F2F2F"  }]} >Planner</Text> 
            <View style={{flex:1 , alignItems:"flex-end"}} >

            <MaterialCommunityIcons 
            onPress={toggleModal}
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
       { loading ? <Loading renk={colorScheme === 'dark' ? "white" :"black"} /> : <ScrollView
       style={{flex:1}}
       refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getTodayData} /> }
       >
      


      {
        veriyok0 ? <View style={{ marginTop:"80%"}} ><Text style={[colorScheme==="dark" ? [styles.dataundifindedtx , {color:"#BFD1E5"}]  :[styles.dataundifindedtx , {color:"#2F2F2F"}]]} >Bu güne ait planınız yok</Text></View> : null
      }







     {tofayD.map((value)=>{
       return(
         <ScrollView 
         key={value.id}
         style={{flex:1}}
       refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getTodayData} /> }
         contentContainerStyle={styles.scroll} >
     

         <Pressable style={styles.data} 
           onPress={() => navigation.navigate('EditOnline' , value)}
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

{
        veriyok1 ? <View style={{ marginTop:"164%"}} ><Text style={[colorScheme==="dark" ? [styles.dataundifindedtx , {color:"#BFD1E5"}]  :[styles.dataundifindedtx , {color:"#2F2F2F"}]]} >Planınız yok</Text></View> : null
      }

     {
     
     data.map((value)=>{
      
       return(
         <ScrollView 
         key={value.id}
         style={{flex:1}}
       refreshControl={ <RefreshControl refreshing={refresh} onRefresh={getData} /> }
       showsVerticalScrollIndicator={false}
         contentContainerStyle={styles.scroll} >
     

         <Pressable style={styles.data} 
          onPress={() => navigation.navigate('EditOnline' , value)}
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


      <Modal isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <View style={styles.headModel} >
          <MaterialCommunityIcons 
            onPress={toggleModal}
            style={{marginRight:"9%"}} name="account-circle-outline" size={80} color={colorScheme === 'dark' ? "#BFD1E5" : "#2F2F2F"} />
            <Text style={[colorScheme === 'dark' ? {fontWeight:"bold" , fontSize:32 ,   color:"#BFD1E5"  } : {fontWeight:"bold" , fontSize:32 , marginLeft:"9%" ,color:"#2F2F2F"  }]} >{userName}</Text> 
        </View>

        
        <View style={{width:"100%" , height:"100%" , marginTop:"8%"}} >

        <Pressable style={styles.pBton} >
        <Text style={{fontWeight:"bold" , fontSize:25 }} >Settings</Text> 
  
</Pressable>
  
<Pressable style={styles.pBton} >
<Text style={{fontWeight:"bold" , fontSize:25 }} >Edit Profile</Text> 
  
</Pressable>


<Pressable
onPress={logout}
style={styles.pBton} >
<Text style={{fontWeight:"bold" , fontSize:25 }} >Log out</Text> 
  
</Pressable>

        </View>



        </View>
      </Modal>



      <Pressable 
      onPress={()=>{navigation.navigate("Addonline")}}
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
  modalContent: {
    backgroundColor:"#00204C",
    padding: 44,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    alignItems: 'center', 
    height:"45%",
  
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
   
   
  },
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
      
     
    },
    dataundifindedtx:{
      fontSize:25,
      fontWeight:"bold",

    },
    headModel:{
      width:"100%",
      height:"25%",
      flexDirection:"row",
      alignItems:"center",
      marginLeft:"8%"
    },
    pBton:{
      height:"15%",
      width:"100%",
      marginTop:"4%",
      backgroundColor:"#EFBA19",
      borderRadius:21,
      alignItems:"center",
      justifyContent:"center"
    }
    
  
});
