import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

interface Booking {
  id: number;
  roomId: number;
  roomNumber: string;
  capacity: number;
  floor: number;
  beds: number;
  price: number;
  checkIn: string;
  checkOut: string;
  type: 'Люкс' | 'Стандарт' | 'Семейный';
}

export const mockBookings: Booking[] = [
  {
    id: 1,
    roomId: 1,
    roomNumber: '101',
    capacity: 2,
    floor: 1,
    beds: 1,
    price: 5000,
    checkIn: '2024-03-20',
    checkOut: '2024-03-25',
    type: 'Стандарт'
  },
  {
    id: 2,
    roomId: 2,
    roomNumber: '201',
    capacity: 3,
    floor: 2,
    beds: 2,
    price: 7500,
    checkIn: '2024-04-01',
    checkOut: '2024-04-05',
    type: 'Люкс'
  }
];

const handleCancelBooking = (bookingId: number) => {
  // TODO: Реализовать отправку данных на сервер
  console.log(`Отмена бронирования ${bookingId}`);
  alert('Бронирование успешно отменено!');
};

const BookingCard = ({ booking }: { booking: Booking }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>Номер {booking.roomNumber}</Title>
        <Paragraph>Тип номера: {booking.type}</Paragraph>
        <Paragraph>Вместимость: {booking.capacity} человек</Paragraph>
        <Paragraph>Этаж: {booking.floor}</Paragraph>
        <Paragraph>Количество кроватей: {booking.beds}</Paragraph>
        <Paragraph>Цена: {booking.price} ₽/ночь</Paragraph>
        <Paragraph>Заезд: {booking.checkIn}</Paragraph>
        <Paragraph>Выезд: {booking.checkOut}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => handleCancelBooking(booking.id)}
          style={styles.cancelButton}
        >
          Отменить бронь
        </Button>
      </Card.Actions>
    </Card>
  );
};

export const MyBookingsScreen = () => {
  const bookings = mockBookings; // заменить на реальные данные при интеграции
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bookingsContainer}>
        {bookings.length === 0 ? (
          <Paragraph style={{ textAlign: 'center', marginTop: 32, color: '#00A4BB', fontSize: 18 }}>
            Активных броней нет
          </Paragraph>
        ) : (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  bookingsContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#1F2937',
    width: '90%',
    alignSelf: 'center',
  },
  cancelButton: {
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