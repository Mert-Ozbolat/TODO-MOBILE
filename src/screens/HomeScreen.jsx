import { StyleSheet, Text, View, SafeAreaView, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import Lottie from 'lottie-react-native';
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { removeItem } from '../utils/asyncStorage';


// Responsive Özelliği
const { width, height } = Dimensions.get('window')

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleReset = async () => {
        await removeItem('onboarded');
        navigation.push('Onboarding');
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.lottie}>
                <Lottie style={{ flex: 1 }} source={require('../assets/animations/confetti.json')}
                    autoPlay
                    loop
                />
            </View>


            <TouchableOpacity style={styles.addTaskButton}
                onPress={() => navigation.navigate('Todo')}
            >
                <LinearGradient style={styles.addTaskButton} colors={['#C40C0C', '#FF8A08']}>
                    <Text style={styles.addTaskText}>New Task, Who's In?</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addTaskButton}
                onPress={(handleReset)}
            >
                <LinearGradient style={styles.resetButton} colors={['#15B392', '#73EC8B']}>
                    <Text style={styles.addTaskText}>Reset</Text>
                </LinearGradient>
            </TouchableOpacity>



        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E8D8C4'

    },
    lottie: {
        width: width * 0.9,
        height: width,
    },
    addTaskButton: {
        width: 270,
        padding: 10,
        borderRadius: 35,
        marginTop: 20,
        shadowColor: '#fff',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    addTaskText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    resetButton: {
        width: 270,
        padding: 10,
        borderRadius: 35,
        marginTop: 20,
    }
})