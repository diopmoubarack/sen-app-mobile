import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, TriangleAlert as AlertTriangle, MessageCircle, CreditCard } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

const actions = [
  {
    icon: FileText,
    title: 'Factures',
    route: '/bills',
    color: Colors.primary,
  },
  {
    icon: AlertTriangle,
    title: 'Signaler',
    route: '/incidents',
    color: Colors.warning,
  },
  {
    icon: MessageCircle,
    title: 'Support',
    route: '/support',
    color: Colors.success,
  },
  {
    icon: CreditCard,
    title: 'Payer',
    route: '/payment',
    color: Colors.secondary,
  },
];

export default function QuickActions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions rapides</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionItem}
            onPress={() => router.push(action.route as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: action.color + '15' }]}>
              <action.icon size={24} color={action.color} />
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
});