import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CreditCard, Plus, ChevronRight } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';

const paymentMethods = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    expiry: '12/25',
    brand: 'visa',
  },
  {
    id: '2',
    type: 'mobile_money',
    provider: 'Orange Money',
    number: '77 123 45 67',
  },
  {
    id: '3',
    type: 'mobile_money',
    provider: 'Wave',
    number: '77 890 12 34',
  },
];

export default function PaymentMethodsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleAddCard = () => {
    router.push('/payment/add-card');
  };

  const handleAddMobileMoney = () => {
    router.push('/payment/add-mobile-money');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Moyens de paiement" showBackButton />

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Cartes enregistrées</Text>
        
        {paymentMethods.filter(m => m.type === 'card').map(method => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.cardInfo}>
              <CreditCard size={24} color={Colors.primary} />
              <View style={styles.cardDetails}>
                <Text style={styles.cardNumber}>
                  •••• •••• •••• {method.last4}
                </Text>
                <Text style={styles.cardExpiry}>
                  Expire {method.expiry}
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color={Colors.grey[400]} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addMethodButton}
          onPress={handleAddCard}
        >
          <Plus size={20} color={Colors.primary} />
          <Text style={styles.addMethodText}>Ajouter une carte</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Mobile Money
        </Text>

        {paymentMethods.filter(m => m.type === 'mobile_money').map(method => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.cardInfo}>
              <Image
                source={
                  method.provider === 'Orange Money'
                    ? { uri: 'https://images.pexels.com/photos/orange-money-logo.jpg' }
                    : { uri: 'https://images.pexels.com/photos/wave-logo.jpg' }
                }
                style={styles.providerLogo}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.providerName}>{method.provider}</Text>
                <Text style={styles.phoneNumber}>{method.number}</Text>
              </View>
            </View>
            <ChevronRight size={20} color={Colors.grey[400]} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addMethodButton}
          onPress={handleAddMobileMoney}
        >
          <Plus size={20} color={Colors.primary} />
          <Text style={styles.addMethodText}>Ajouter Mobile Money</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Confirmer"
          onPress={() => router.back()}
          fullWidth
          disabled={!selectedMethod}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetails: {
    marginLeft: 12,
  },
  cardNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  cardExpiry: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: 4,
  },
  providerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  providerName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: 4,
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
  },
  addMethodText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
    marginLeft: 12,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.grey[200],
  },
});