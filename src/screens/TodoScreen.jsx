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

    useEffect(() => {
        loadTodos();
    }, []);

    const addTodo = () => {
        const updatedTodos = [...todos, { id: uuid.v4(), text: todo }];
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.headerText}>React Native Async Storage</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={text => setTodo(text)}
                        placeholder="Type a Todo"
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={addTodo}
                        style={[styles.button, styles.addButton]}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={todos}
                    keyExtractor={item => item?.id?.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.todoItem}>
                            <Text style={{ color: '#00000' }}>{item?.text}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={() => deleteTodo(item?.id)}
                                        style={[styles.button, styles.deleteButton]}>
                                        <Text style={styles.buttonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={() => updateTodos(item?.id)}
                                        style={[styles.button, styles.updateButton]}>
                                        <Text style={styles.buttonText}>Update</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
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
        borderColor: 'gray',
    },
    button: {
        marginLeft: 10,
        borderRadius: 5,
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
    },
    buttonContainer: {},
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    deleteButton: {
        padding: 10,
        backgroundColor: 'red',
    },
    updateButton: {
        backgroundColor: 'green',
        padding: 10,
    },
});
