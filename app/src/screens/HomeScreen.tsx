import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

interface Room {
  id: number;
  number: string;
  capacity: number;
  floor: number;
  beds: number;
  price: number;
  type: 'Люкс' | 'Стандарт' | 'Семейный';
}

const mockRooms: Room[] = [
  {
    id: 1,
    number: '101',
    capacity: 2,
    floor: 1,
    beds: 1,
    price: 5000,
    type: 'Стандарт'
  },
  {
    id: 2,
    number: '201',
    capacity: 3,
    floor: 2,
    beds: 2,
    price: 7500,
    type: 'Люкс'
  },
  {
    id: 3,
    number: '301',
    capacity: 4,
    floor: 3,
    beds: 2,
    price: 10000,
    type: 'Семейный'
  }
];

const handleBookRoom = (roomId: number) => {
  // TODO: Реализовать отправку данных на сервер
  console.log(`Бронирование номера ${roomId}`);
  alert('Бронирование успешно создано!');
};

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>Номер {room.number}</Title>
        <Paragraph>Тип номера: {room.type}</Paragraph>
        <Paragraph>Вместимость: {room.capacity} человек</Paragraph>
        <Paragraph>Этаж: {room.floor}</Paragraph>
        <Paragraph>Количество кроватей: {room.beds}</Paragraph>
        <Paragraph>Цена: {room.price} ₽/ночь</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => handleBookRoom(room.id)}
          style={styles.bookButton}
        >
          Забронировать
        </Button>
      </Card.Actions>
    </Card>
  );
};

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.roomsContainer}>
        {mockRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  roomsContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#1F2937',
    width: '90%',
    alignSelf: 'center',
  },
  bookButton: {
    backgroundColor: '#7C3AED',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 8,
  },
}); 