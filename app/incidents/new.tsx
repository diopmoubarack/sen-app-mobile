import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Camera, MapPin, Upload } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';

const incidentTypes = [
  'Coupure de courant',
  'Compteur défectueux',
  'Câble électrique',
  'Poteau endommagé',
  'Autre',
];

export default function NewIncidentScreen() {
  const insets = useSafeAreaInsets();
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/incidents');
    }, 1500);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Signaler un incident" showBackButton />

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Type d'incident</Text>
        <View style={styles.typeContainer}>
          {incidentTypes.map((incidentType) => (
            <TouchableOpacity
              key={incidentType}
              style={[
                styles.typeButton,
                type === incidentType && styles.selectedType,
              ]}
              onPress={() => setType(incidentType)}
            >
              <Text
                style={[
                  styles.typeText,
                  type === incidentType && styles.selectedTypeText,
                ]}
              >
                {incidentType}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Localisation</Text>
        <View style={styles.locationContainer}>
          <MapPin size={20} color={Colors.grey[500]} />
          <TextInput
            style={styles.locationInput}
            placeholder="Adresse de l'incident"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Décrivez l'incident en détail"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.sectionTitle}>Photo</Text>
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.changeImageButton}
              onPress={pickImage}
            >
              <Upload size={20} color={Colors.primary} />
              <Text style={styles.changeImageText}>Changer la photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Camera size={24} color={Colors.primary} />
            <Text style={styles.uploadText}>Ajouter une photo</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Signaler l'incident"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          disabled={!type || !location || !description}
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
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  typeButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  selectedType: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  selectedTypeText: {
    color: Colors.white,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  locationInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  descriptionInput: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 24,
    height: 120,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.grey[300],
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
    marginLeft: 8,
  },
  imageContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.grey[200],
  },
  changeImageText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.grey[200],
  },
});