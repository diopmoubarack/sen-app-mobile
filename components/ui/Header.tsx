import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ArrowLeft, BellRing, Menu as MenuIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenu?: boolean;
  showNotification?: boolean;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
}

export default function Header({
  title,
  showBackButton = false,
  showMenu = false,
  showNotification = false,
  onMenuPress,
  onNotificationPress,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.header}>
        {showBackButton ? (
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <ArrowLeft color={Colors.text.primary} size={24} />
          </TouchableOpacity>
        ) : showMenu ? (
          <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
            <MenuIcon color={Colors.text.primary} size={24} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderIcon} />
        )}

        <Text style={styles.title}>{title}</Text>

        {showNotification ? (
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <BellRing color={Colors.text.primary} size={24} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderIcon} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    width: 40,
  },
});