import { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CirclePlus as PlusCircle } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import IncidentStatusCard, { IncidentStatus } from '@/components/incidents/IncidentStatusCard';
import Colors from '@/constants/Colors';

// Mock data
const incidentsData = [
  {
    id: '78923',
    type: 'Coupure de courant',
    location: 'Quartier Liberté 6, Dakar',
    reportDate: '10 Juillet 2025',
    status: 'pending' as IncidentStatus,
    description: 'Panne électrique dans tout le quartier depuis ce matin.',
  },
  {
    id: '78540',
    type: 'Compteur défectueux',
    location: 'Quartier Liberté 6, Dakar',
    reportDate: '25 Juin 2025',
    status: 'processing' as IncidentStatus,
    description: 'Le compteur affiche des valeurs erratiques et fait un bruit anormal.',
  },
  {
    id: '77182',
    type: 'Câble électrique tombé',
    location: 'Avenue Cheikh Anta Diop, Dakar',
    reportDate: '02 Juin 2025',
    status: 'resolved' as IncidentStatus,
    description: 'Câble électrique tombé sur la chaussée suite à une tempête.',
  },
];

export default function IncidentsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const filteredIncidents = incidentsData.filter((incident) => {
    if (activeTab === 'active') {
      return incident.status === 'pending' || incident.status === 'processing';
    } else {
      return incident.status === 'resolved' || incident.status === 'closed';
    }
  });

  const handleNewIncident = () => {
    console.log('Create new incident');
    // Navigate to incident creation screen
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Incidents" showBackButton={false} />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}
          >
            En cours
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText,
            ]}
          >
            Historique
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {filteredIncidents.length > 0 ? (
          filteredIncidents.map((incident) => (
            <IncidentStatusCard
              key={incident.id}
              id={incident.id}
              type={incident.type}
              location={incident.location}
              reportDate={incident.reportDate}
              status={incident.status}
              description={incident.description}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'active'
                ? 'Aucun incident en cours'
                : 'Aucun incident dans l\'historique'}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Signaler un incident"
          onPress={handleNewIncident}
          leftIcon={<PlusCircle size={20} color={Colors.white} />}
          fullWidth
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text.muted,
  },
  activeTabText: {
    color: Colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.grey[200],
  },
});