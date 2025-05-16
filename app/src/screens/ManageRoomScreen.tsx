import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Button, Text, List, Divider } from 'react-native-paper';
import Slider from '@react-native-community/slider';

interface Room {
  id: string;
  number: string;
  floor: number;
  type: string;
  controls: RoomControls;
}

interface RoomControls {
  doorLocked: boolean;
  humidity: number;
  temperature: number;
  lightsOn: boolean;
}

const mockRooms: Room[] = [
  {
    id: '1',
    number: '101',
    floor: 1,
    type: 'Стандарт',
    controls: {
      doorLocked: true,
      humidity: 45,
      temperature: 22,
      lightsOn: false,
    }
  },
  {
    id: '2',
    number: '205',
    floor: 2,
    type: 'Люкс',
    controls: {
      doorLocked: true,
      humidity: 50,
      temperature: 23,
      lightsOn: true,
    }
  },
  {
    id: '3',
    number: '310',
    floor: 3,
    type: 'Стандарт',
    controls: {
      doorLocked: true,
      humidity: 48,
      temperature: 21,
      lightsOn: false,
    }
  }
];

export const ManageRoomScreen = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [selectedTab, setSelectedTab] = useState<'info' | 'bookings'>('info');

  // Имитация получения данных с сервера при загрузке
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    // TODO: Реализовать получение данных с сервера
    console.log('Получение списка забронированных номеров');
    setRooms(mockRooms);
    if (mockRooms.length > 0) {
      setSelectedRoom(mockRooms[0]);
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleDoorControl = async (lock: boolean) => {
    if (!selectedRoom) return;
    // TODO: Реализовать отправку данных на сервер
    console.log(`Дверь ${lock ? 'закрыта' : 'открыта'} в номере ${selectedRoom.number}`);
    setSelectedRoom(prev => prev ? {
      ...prev,
      controls: { ...prev.controls, doorLocked: lock }
    } : null);
  };

  const handleHumidityChange = async (value: number) => {
    if (!selectedRoom) return;
    // TODO: Реализовать отправку данных на сервер
    console.log(`Установлена влажность: ${value}% в номере ${selectedRoom.number}`);
    setSelectedRoom(prev => prev ? {
      ...prev,
      controls: { ...prev.controls, humidity: value }
    } : null);
  };

  const handleTemperatureChange = async (value: number) => {
    if (!selectedRoom) return;
    // TODO: Реализовать отправку данных на сервер
    console.log(`Установлена температура: ${value}°C в номере ${selectedRoom.number}`);
    setSelectedRoom(prev => prev ? {
      ...prev,
      controls: { ...prev.controls, temperature: value }
    } : null);
  };

  const handleLightsControl = async (on: boolean) => {
    if (!selectedRoom) return;
    // TODO: Реализовать отправку данных на сервер
    console.log(`Свет ${on ? 'включен' : 'выключен'} в номере ${selectedRoom.number}`);
    setSelectedRoom(prev => prev ? {
      ...prev,
      controls: { ...prev.controls, lightsOn: on }
    } : null);
  };

  if (!selectedRoom) {
    return (
      <View style={styles.container}>
        <Text style={styles.noRoomsText}>Нет доступных номеров</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Список номеров */}
        <Card style={styles.section}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Выберите номер</Title>
            {rooms.map((room) => (
              <React.Fragment key={room.id}>
                <List.Item
                  title={`Номер ${room.number}`}
                  description={`${room.floor} этаж`}
                  onPress={() => handleRoomSelect(room)}
                  style={[
                    styles.roomItem,
                    selectedRoom.id === room.id && styles.selectedRoom
                  ]}
                  titleStyle={styles.roomTitle}
                  descriptionStyle={styles.roomDescription}
                />
                <Divider />
              </React.Fragment>
            ))}
          </Card.Content>
        </Card>

        {/* Секция управления дверью */}
        <Card style={styles.section}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Управление дверью</Title>
            <View style={styles.buttonGroup}>
              <Button
                mode="contained"
                onPress={() => handleDoorControl(false)}
                style={[styles.button, !selectedRoom.controls.doorLocked && styles.activeButton]}
                disabled={!selectedRoom.controls.doorLocked}
              >
                Открыть
              </Button>
              <Button
                mode="contained"
                onPress={() => handleDoorControl(true)}
                style={[styles.button, selectedRoom.controls.doorLocked && styles.activeButton]}
                disabled={selectedRoom.controls.doorLocked}
              >
                Закрыть
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Секция управления влажностью */}
        <Card style={styles.section}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Управление влажностью</Title>
            <Text style={styles.valueText}>{selectedRoom.controls.humidity}%</Text>
            <Slider
              value={selectedRoom.controls.humidity}
              onValueChange={handleHumidityChange}
              minimumValue={30}
              maximumValue={70}
              step={1}
              style={styles.slider}
              minimumTrackTintColor="#7C3AED"
              maximumTrackTintColor="#374151"
              thumbTintColor="#7C3AED"
            />
          </Card.Content>
        </Card>

        {/* Секция управления температурой */}
        <Card style={styles.section}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Управление температурой</Title>
            <Text style={styles.valueText}>{selectedRoom.controls.temperature}°C</Text>
            <Slider
              value={selectedRoom.controls.temperature}
              onValueChange={handleTemperatureChange}
              minimumValue={16}
              maximumValue={30}
              step={1}
              style={styles.slider}
              minimumTrackTintColor="#7C3AED"
              maximumTrackTintColor="#374151"
              thumbTintColor="#7C3AED"
            />
          </Card.Content>
        </Card>

        {/* Секция управления светом */}
        <Card style={styles.section}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Управление светом</Title>
            <View style={styles.buttonGroup}>
              <Button
                mode="contained"
                onPress={() => handleLightsControl(true)}
                style={[styles.button, selectedRoom.controls.lightsOn && styles.activeButton]}
                disabled={selectedRoom.controls.lightsOn}
              >
                Включить
              </Button>
              <Button
                mode="contained"
                onPress={() => handleLightsControl(false)}
                style={[styles.button, !selectedRoom.controls.lightsOn && styles.activeButton]}
                disabled={!selectedRoom.controls.lightsOn}
              >
                Выключить
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#1F2937',
    width: '90%',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#F9FAFB',
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#374151',
  },
  activeButton: {
    backgroundColor: '#7C3AED',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  valueText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 8,
    color: '#F9FAFB',
  },
  roomItem: {
    backgroundColor: '#1F2937',
  },
  selectedRoom: {
    backgroundColor: '#7C3AED',
  },
  roomTitle: {
    fontSize: 18,
    color: '#F9FAFB',
  },
  roomDescription: {
    color: '#9CA3AF',
  },
  noRoomsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 20,
  },
  tabButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#374151',
  },
  selectedTabButton: {
    backgroundColor: '#7C3AED',
  },
  tabButtonLabel: {
    color: '#9CA3AF',
  },
  selectedTabButtonLabel: {
    color: '#F9FAFB',
  },
}); 