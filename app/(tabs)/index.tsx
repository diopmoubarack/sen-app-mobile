import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/ui/Header';
import PowerUsageSummary from '@/components/home/PowerUsageSummary';
import ConsumptionChart from '@/components/home/ConsumptionChart';
import QuickActions from '@/components/home/QuickActions';
import Card from '@/components/ui/Card';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// Mock data
const userData = {
  name: 'Amadou Diallo',
  accountNumber: '237-089-412',
  currentUsage: 245,
  previousUsage: 220,
  billingPeriod: '01 Juin - 30 Juin 2025',
};

const consumptionData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  data: [180, 200, 190, 210, 220, 245],
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header
        title="SENELEC"
        showMenu={true}
        showNotification={true}
        onMenuPress={() => setMenuVisible(true)}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.welcome}>
          <View>
            <Text style={styles.welcomeText}>Bonjour,</Text>
            <Text style={styles.userName}>{userData.name}</Text>
          </View>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/7567440/pexels-photo-7567440.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
            style={styles.userAvatar}
          />
        </View>

        <View style={styles.accountInfo}>
          <Text style={styles.accountLabel}>Compte client</Text>
          <Text style={styles.accountNumber}>{userData.accountNumber}</Text>
        </View>

        <PowerUsageSummary
          currentUsage={userData.currentUsage}
          previousUsage={userData.previousUsage}
          billingPeriod={userData.billingPeriod}
        />

        <ConsumptionChart
          data={consumptionData.data}
          labels={consumptionData.labels}
        />

        <QuickActions />

        <Card style={styles.notificationCard}>
          <View style={styles.notificationHeader}>
            <AlertTriangle size={20} color={Colors.warning} />
            <Text style={styles.notificationTitle}>Coupure planifiée</Text>
          </View>
          <Text style={styles.notificationText}>
            Une maintenance est prévue dans votre quartier le 15 Juillet 2025 de 9h à 14h.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  welcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  accountLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    marginRight: 8,
  },
  accountNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
    backgroundColor: Colors.grey[200],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  notificationCard: {
    backgroundColor: Colors.warning + '10',
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  notificationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});