import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Onboarding from "react-native-onboarding-swiper";
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';


const { width, height } = Dimensions.get('window')

const OnboardingScreen = () => {

    const navigation = useNavigation();

    const handleDone = () => {
        navigation.navigate('Home')
        setItem('onboarded', '1');
    }

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton}{...props}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                DoneButtonComponent={doneButton}
                container
                pages={[
                    {
                        backgroundColor: '#243642',
                        image: (
                            <View style={styles.lottie}>
                                <Lottie style={{ flex: 1 }} source={require('../assets/animations/boost.json')}
                                    autoPlay
                                    loop
                                />
                            </View>
                        ),
                        title: 'Boost Your Productivity',
                        subtitle: 'Join our Udemig courses to enhance your skill!! ',
                    },


                    {
                        backgroundColor: '#387478',
                        image: (
                            <View style={styles.lottie}>
                                <Lottie style={{ flex: 1 }} source={require('../assets/animations/work.json')}
                                    autoPlay
                                    loop
                                />
                            </View>
                        ),
                        title: 'Work Without Interruptions',
                        subtitle: 'Compşete your tasks smoothly with our productivity tips.',
                    },



                    {
                        backgroundColor: '#629584',
                        image: (
                            <View style={styles.lottie}>
                                <Lottie style={{ flex: 1 }} source={require('../assets/animations/achieve.json')}
                                    autoPlay
                                    loop
                                />
                            </View>
                        ),
                        title: 'Reach Higher Goals',
                        subtitle: 'Utilize our platform to achieve your profssional aspirations.',
                    },
                ]}
            />

        </View>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    lottie: {
        width: width * 0.9,
        height: width,
    },
    doneButton: {
        padding: 20
    },
    doneText: {
        color: 'white'
    }

})