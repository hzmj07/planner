import { Image, StyleSheet, Platform , View ,Text ,Pressable , ScrollView , TextInput , Switch ,useColorScheme }from 'react-native';
import React, { useState , useEffect } from 'react'
import DateTimePicker from 'react-native-ui-datepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { getFirestore, doc, updateDoc , deleteDoc} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import { Audio } from "expo-av"; // for audio feedback (click sound as you scroll)
import * as Haptics from "expo-haptics"
import moment from 'moment';
import { Loading } from '../loading';
import app from '@/firebaseConnect';





export default function EditOnline({route , navigation}) {

  const [darkMode , setDarkmode] = useState("");
  const db = getFirestore(app);
  const colorScheme = useColorScheme();

  const {time , tarih ,not , baslik , bld ,id} = route.params

  function formatDate(inputDate) {
    const date = new Date(inputDate); // Stringi Date nesnesine çevir
  
    const day = String(date.getDate()).padStart(2, '0'); // Gün, iki haneli
    const month = date.toLocaleString('en-US', { month: 'short' }); // Kısa ay ismi
    const year = String(date.getFullYear()).slice(-2); // Yılın son iki hanesi
  
    return `${day} ${month} ${year}`; // İstenen formatta döndür
  }
  
  const formattedDate = formatDate(new Date());



//
  const [alarmString, setAlarmString] = useState<
          string | null
      >(null);

  const [note , setNote] = useState(not);
  const [title , setTitle] = useState(baslik);  
  const [date, setDate] = useState(tarih);  
  const [noti , setNoti] = useState(bld);
  const [ loading , setLoading] =useState(false);  
  //
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const toggleSwitch = () => setNoti(previousState => !previousState);

  const [showPicker, setShowPicker] = useState(false);
  


      useEffect(() => {
      

        setDarkmode(colorScheme);
        console.log("seted" , darkMode)
        if (alarmString === null) {
          setAlarmString(time);
        }
        
      }, [alarmString]);

      const updateDataById = async (id) => {

        const newData = {
          tarih: date,
          time: alarmString,
          not: note,
          baslik: title,
          
        };

        const document = doc(db, 'data', id);
        
        try {


          await updateDoc(document, newData);
          console.log('Document successfully updated!');
          console.log("saved");
          navigation.navigate('Homeonline');


        } catch (error) {
          console.error('Error updating document: ', error);
        }

      };
      

      const deleteDataById = async (id) => {
        try {
          // Tüm veriyi al
          await deleteDoc(doc(db, "data", id));
            } catch (error) {
              console.log('JSON parse hatası:', error);
            }
          };
          // İlgili id'yi bul ve diziden çıkar
          
        
      

      const formatTime = ({
        hours,
        minutes,
        
    }: {
        hours?: number;
        minutes?: number;
        
    }) => {
        const timeParts = [];
    
        if (hours !== undefined) {
            timeParts.push(hours.toString().padStart(2, "0"));
        }
        if (minutes !== undefined) {
            timeParts.push(minutes.toString().padStart(2, "0"));
        }
        
    
        return timeParts.join(":");
        
    };

    console.log(alarmString)
  function save(){
    
    updateDataById(id);
    
  

  };
  function cancel(){
    console.log("canceled")
    navigation.navigate('Homeonline')
  };

  function delet(){
    deleteDataById(id);
    navigation.navigate('Homeonline')

  };
///////////////
  const handleConfirm = (date) => {

    function formatDate(inputDate) {
      const date = new Date(inputDate); // Stringi Date nesnesine çevir
    
      const day = String(date.getDate()).padStart(2, '0'); // Gün, iki haneli
      const month = date.toLocaleString('en-US', { month: 'short' }); // Kısa ay ismi
      const year = String(date.getFullYear()).slice(-2); // Yılın son iki hanesi
    
      return `${day} ${month} ${year}`; // İstenen formatta döndür
    }
    
    const formattedDate = formatDate(date);
    setDate(formattedDate);
    setDatePickerVisibility(false);

  };
/////////////////

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };



  console.log("saved date : ", date)
  console.log( "tepyof date", typeof date)

  return (
    <View style={colorScheme === 'dark' ? [styles.main , {backgroundColor:"#0F0F0F"} ]: styles.main} >


      <View style={styles.head} >
      
    
    
      </View>


      
    {
      loading  ? <Loading renk={"black"} /> : 
      <View style={styles.data} >


        <View style={[styles.datatexView , {marginTop:"25%"} ]} >
        

                  <View style={{ width:"100%",borderWidth:0, alignItems:"center" , justifyContent:"center"
                  }} >
                     <Pressable 
                 onPress={showDatePicker} 
                style={styles.tabs} >
                  <View style={{marginLeft:"8%"}} >
                     <FontAwesome6    name="calendar" size={35} color="#8ca87c" />
                  </View>
                  <Text style={styles.dataTex} >{date}</Text></Pressable>

                <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={( ()=> {setDatePickerVisibility(false)} )}
                      />
                      
                      </View>

             

      
        </View>

        <View style={styles.datatexView} >
        <Pressable 
                 onPress={()=>{setShowPicker(true)}} 
                style={styles.tabs} >
                  <View style={{marginLeft:"8%"}} >
                     <FontAwesome6    name="calendar" size={35} color="#8ca87c" />
                  </View>
                  <Text style={styles.dataTex} >{alarmString}</Text></Pressable>

          <TimerPickerModal
            visible={showPicker}
            setIsVisible={setShowPicker}
            onConfirm={(pickedDuration) => {
                setAlarmString(formatTime(pickedDuration));
                setShowPicker(false);
            }}
            modalTitle="select time"
            onCancel={() => setShowPicker(false)}
            closeOnOverlayPress
            Audio={Audio}
            LinearGradient={LinearGradient}
            Haptics={Haptics}
            styles={{
                theme:"dark",
            }}
            modalProps={{
                overlayOpacity: 0.1,
            }}
        />
                
        </View>
          <View style={{height:"80%",width:"100%", alignItems:"center",marginTop:"12%" }} >
                    <TextInput
                    value={title}
                    onChangeText={(text)=>{setTitle(text)}} 
                    placeholderTextColor="#8ca87c"
                    placeholder='TITLE'
                    style={styles.input} >





                    </TextInput>

                    <TextInput
                    value={note}
                    onChangeText={(note)=>{setNote(note)}} 
                    placeholderTextColor="#8ca87c"
                    placeholder='NOTE'
                    style={styles.input} >




                    </TextInput>


                    {/* <View style={styles.noti}  >
                    <Ionicons  style={{marginLeft:"8%"}} name="notifications-sharp" size={35} color="#8ca87c" />
                    <Text style={{fontSize:25, fontWeight:"bold", marginLeft:"10%"}} >notifications</Text>
                    <Switch
                    style={{marginLeft:"20%"}}
                    trackColor={{false: '#767577', true: '#8ca87c'}}
                    thumbColor={noti ? '#35442c' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={noti}
                     />
                    </View> */}


                    <View style={styles.saveComp}>



                    <Pressable 
                    onPress={delet}
                    style={[styles.sBton,{borderWidth:1}]} >
                        <Text style={styles.saveBT} >DELETE</Text>
                      </Pressable>

                    <Pressable 
                    onPress={cancel}
                    style={[styles.sBton,{borderWidth:1}]} >
                        <Text style={styles.saveBT} >cancel</Text>
                      </Pressable>


                      <Pressable 
                      onPress={save}
                      style={[styles.sBton,{backgroundColor:"#fff9f3"}]} >
                        <Text style={styles.saveBT} >save</Text>
                      </Pressable>

                    </View>

                </View>
        
        
        
        
        </View>

    }

     
        

      
      
     

    </View>
    
  );
}

const styles = StyleSheet.create({
  main:{
    flex:1 ,
     borderWidth:0 ,
     alignItems:"center",
     justifyContent:"center",
     backgroundColor:"white"
     },


  head:{
    width:"100%",
    height:"10%",
    flexDirection:"row", 
    borderWidth:0,
    alignItems:"center",
    justifyContent:"center"
  },
  tabs:{
    borderWidth:0,
    marginLeft:16,
    height:50,
    justifyContent:"flex-start",
    marginTop:26,
    width:"80%",
    alignItems:"center",
    borderBottomWidth:2,
    borderColor:"#8ca87c",
    flexDirection:"row"
    
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
      width:"95%",
      height:"60%",
      marginBottom:18,
      borderRadius:41, 
      justifyContent:"center",
      alignItems:"center",

     
      
    },
    dataTex:{
      marginLeft:"8%",
      fontSize:35,
      fontWeight:"bold",
      color:"#8ca87c",
     
    },
    datatexView:{
      
      width:"80%",
      alignItems:"center",
      justifyContent:"center",
      height:"10%",
      
      
      

    },
    dataData:{
      flex:1,
      borderWidth:1
    },
    calView:{
      flex:1,
      borderRadius:16,
      backgroundColor:"white",
      
      width:"90%",
      position: 'absolute',
      zIndex: 1

    },
    buton:{
      height:30,
      width:60,
      borderWidth:1,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:22,
      margin:12
      

    },
    input:{
      height:"20%",
      width:"90%",
      borderBottomWidth:2,
      marginBottom:16,
      textAlign:"center",
      fontSize:35,
      fontWeight:"bold",
      color:"#8ca87c",
      borderColor:"#8ca87c"
      

    },
    noti:{
      marginTop:26,
      borderWidth:1,
      width:"90%",
      height:"12%",
      borderRadius:41,
      flexDirection:"row",
      alignItems:"center", 
     
    },
    saveComp:{
      width:"85%",
      height:"9%",
      borderWidth:0,
      alignItems:"center",
      justifyContent:"flex-end",
      marginTop:"8%",
      flexDirection:"row"
    },
    sBton:{
      height:"100%",
      width:90,
      marginLeft:12,
      alignItems:"center",
      justifyContent:"center",
      borderRadius:22,},

      saveBT:{
        fontSize:20,
        fontWeight:"bold",
        color:"#8ca87c"
      }

  
});
