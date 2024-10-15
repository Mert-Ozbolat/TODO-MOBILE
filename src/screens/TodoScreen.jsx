import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { AddCircle, CloseCircle, TickCircle, Trash, Edit2 } from 'iconsax-react-native';


const TodoScreen = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const saveTodos = async saveTodo => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
        } catch (error) {
            console.log(error);
        }
    };

    const loadTodos = async () => {
        try {
            const storedData = await AsyncStorage.getItem('todos');
            if (storedData) {
                setTodos(JSON.parse(storedData));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTodo = async id => {
        const updatedTodos = todos.filter(item => item.id !== id);
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    const updateTodos = id => {
        const exitingTodo = todos?.find(item => item.id === id);
        if (!exitingTodo) return;
        Alert.prompt('Edit Todo', 'Update', newUpdateText => {
            if (newUpdateText) {
                const updateTodos = todos.map(item =>
                    item?.id === id ? { ...item, text: newUpdateText } : item,
                );
                setTodos(updateTodos);
                saveTodos(updateTodos);
            }
        },
            'plain-text',
            exitingTodo.text,
        );
    };

    const completeTodo = async (id) => {
        const updateTodos = todos.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item,

        );
        setTodos(updateTodos);
        saveTodos(updateTodos);
    }

    useEffect(() => {
        loadTodos();
    }, []);

    const addTodo = () => {
        const updatedTodos = [...todos, { id: uuid.v4(), text: todo }];
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    return (
        <LinearGradient colors={['#7C93C3', '#1E2A5E']} style={styles.container}>
            <SafeAreaView>
                <Text style={styles.headerText}>TO DO LIST</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={text => setTodo(text)}
                        placeholder="Type a Todo"
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={addTodo}
                        style={[styles.button, styles.addButton]}>
                        <AddCircle size="32" color='white' variant='Broken' />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={todos}
                    keyExtractor={item => item?.id?.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.todoItem}>
                            <Text
                                style={[styles.todoText,
                                item.completed && styles.completedText
                                ]}>{item?.text}</Text>

                            <View style={{ flexDirection: 'row' }}>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={() => completeTodo(item?.id)}
                                        style={[styles.button, styles.completeButton]}>
                                        {
                                            item.completed ? (
                                                <CloseCircle size={27} color='white' variant='Broken' />
                                            ) : (
                                                <TickCircle size={27} color='white' variant='Broken' />
                                            )
                                        }
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={() => deleteTodo(item?.id)}
                                        style={[styles.button, styles.deleteButton]}>
                                        <Text style={styles.buttonText}>
                                            <Trash size={27} color='white' variant='Broken' />
                                        </Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={() => updateTodos(item?.id)}
                                        style={[styles.button, styles.updateButton]}>
                                        <Text style={styles.buttonText}>
                                            <Edit2 size={27} color='white' variant='Broken' />
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>
        </LinearGradient>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        flex: 1,
        borderRadius: 10,
        borderColor: 'black',
    },
    button: {
        marginLeft: 10,
        borderRadius: 5,
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#0B666A',
        width: 60
    },
    buttonText: {
        color: 'white',
        fontSize: 15
    },
    buttonContainer: {},
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    todoText: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 4,
        borderRadius: 5,
        maxWidth: 210,
        color: '#000',
        textDecorationLine: 'none',
        fontSize: 18,
        fontWeight: 'bold',
    },
    completeButton: {
        padding: 10,
    },
    completedText: {
        textDecorationLine: 'line-through',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.2)',
    },
    deleteButton: {
        padding: 10,
    },
    updateButton: {
        padding: 10,
    },

});
