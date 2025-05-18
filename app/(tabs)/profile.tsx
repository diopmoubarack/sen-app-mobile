import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings, CreditCard, Lock, CircleHelp as HelpCircle, Globe, ChevronRight, LogOut } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';

// Mock data
const userData = {
  name: 'Amadou Diallo',
  email: 'amadou.diallo@example.com',
  phone: '+221 77 123 45 67',
  accountNumber: '237-089-412',
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const handleLanguageChange = () => {
    console.log('Navigate to language settings');
  };

  const handleLogout = () => {
    console.log('Log out user');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Profil" showBackButton={false} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/7567440/pexels-photo-7567440.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{userData.name}</Text>
              <Text style={styles.accountNumber}>Compte #{userData.accountNumber}</Text>
            </View>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>{userData.email}</Text>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Téléphone</Text>
            <Text style={styles.contactValue}>{userData.phone}</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Paramètres du compte</Text>

        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <CreditCard size={20} color={Colors.primary} />
            </View>
            <Text style={styles.settingText}>Méthodes de paiement</Text>
            <ChevronRight size={20} color={Colors.grey[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Lock size={20} color={Colors.primary} />
            </View>
            <Text style={styles.settingText}>Sécurité</Text>
            <ChevronRight size={20} color={Colors.grey[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Settings size={20} color={Colors.primary} />
            </View>
            <Text style={styles.settingText}>Notifications</Text>
            <Switch
              trackColor={{ false: Colors.grey[300], true: Colors.primaryLight }}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.grey[300]}
              value={true}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleLanguageChange}>
            <View style={styles.settingIconContainer}>
              <Globe size={20} color={Colors.primary} />
            </View>
            <Text style={styles.settingText}>Langue</Text>
            <View style={styles.languageContainer}>
              <Text style={styles.currentLanguage}>Français</Text>
              <ChevronRight size={20} color={Colors.grey[400]} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Support</Text>

        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={Colors.primary} />
            </View>
            <Text style={styles.settingText}>Aide et Support</Text>
            <ChevronRight size={20} color={Colors.grey[400]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileCard: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
  },
  accountNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
  },
  contactInfo: {
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLanguage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.error,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    textAlign: 'center',
    marginBottom: 16,
  },
});