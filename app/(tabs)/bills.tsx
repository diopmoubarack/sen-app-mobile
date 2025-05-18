import { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/ui/Header';
import BillCard, { BillStatus } from '@/components/bills/BillCard';
import Colors from '@/constants/Colors';

// Mock data
const billsData = [
  {
    id: '24576',
    amount: 25600,
    dueDate: '15 Juillet 2025',
    period: 'Juin 2025',
    status: 'pending' as BillStatus,
  },
  {
    id: '23891',
    amount: 27800,
    dueDate: '15 Juin 2025',
    period: 'Mai 2025',
    status: 'paid' as BillStatus,
  },
  {
    id: '23145',
    amount: 22400,
    dueDate: '15 Mai 2025',
    period: 'Avril 2025',
    status: 'paid' as BillStatus,
  },
  {
    id: '22657',
    amount: 24200,
    dueDate: '15 Avril 2025',
    period: 'Mars 2025',
    status: 'paid' as BillStatus,
  },
];

type FilterType = 'all' | 'pending' | 'paid';

export default function BillsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredBills = billsData.filter((bill) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return bill.status === 'pending' || bill.status === 'overdue';
    if (activeFilter === 'paid') return bill.status === 'paid';
    return true;
  });

  const handleBillPress = (id: string) => {
    console.log(`Bill ${id} pressed`);
    // Navigate to bill details or payment screen
  };

  const handleDownload = (id: string) => {
    console.log(`Download bill ${id}`);
    // Handle bill download
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Mes Factures" showBackButton={false} />

      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'all' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'all' && styles.activeFilterText,
            ]}
          >
            Toutes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'pending' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('pending')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'pending' && styles.activeFilterText,
            ]}
          >
            À payer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'paid' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('paid')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'paid' && styles.activeFilterText,
            ]}
          >
            Payées
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BillCard
            id={item.id}
            amount={item.amount}
            dueDate={item.dueDate}
            period={item.period}
            status={item.status}
            onPress={() => handleBillPress(item.id)}
            onDownload={() => handleDownload(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune facture disponible</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  activeFilterText: {
    color: Colors.white,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
  },
});