import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, Button, Alert } from 'react-native';
import { fetchAccounts, fetchContacts, createAccount } from '../../api/dynamicsCRM';
import { getToken } from '../../api/auth';

const HomeScreen = ({ clientId, tenantId, clientSecret }) => {
  const [accounts, setAccounts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAccounts, setShowAccounts] = useState(true);
  const [newAccountName, setNewAccountName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const accessToken = await getToken(clientId, tenantId, clientSecret);
      const fetchedAccounts = await fetchAccounts(accessToken);
      setAccounts(fetchedAccounts);
      const fetchedContacts = await fetchContacts(accessToken);
      setContacts(fetchedContacts);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const accessToken = await getToken(clientId, tenantId, clientSecret);
      const newAccountData = {
        name: newAccountName,
        // Add other fields as needed
      };
      console.log('Creating account with data:', newAccountData);
      const response = await createAccount(accessToken, newAccountData);
      /*
      if (response && response.data) {
        await fetchData();
        setNewAccountName('');
        Alert.alert('Success', 'Account created successfully!');
      } else {
        throw new Error('Invalid response from createAccount');
      }*/
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', 'This already exists!');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10 }}>
      <Text>{showAccounts ? item.name : item.fullname}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 90 }}>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="New Account Name"
        value={newAccountName}
        onChangeText={setNewAccountName}
      />
      <Button
        title="Create Account"
        onPress={handleCreateAccount}
      />
      <Button
        title={showAccounts ? "Show Contacts" : "Show Accounts"}
        onPress={() => setShowAccounts(!showAccounts)}
        style={{ marginTop: 20 }}
      />
      <FlatList
        style={{ width: '100%' }}
        data={showAccounts ? accounts : contacts}
        renderItem={renderItem}
        keyExtractor={(item) => showAccounts ? item.accountid : item.contactid}
      />
    </View>
  );
};

export default HomeScreen;
