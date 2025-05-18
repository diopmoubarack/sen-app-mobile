import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Download, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';

export type BillStatus = 'paid' | 'pending' | 'overdue';

interface BillCardProps {
  id: string;
  amount: number;
  dueDate: string;
  period: string;
  status: BillStatus;
  onPress: () => void;
  onDownload?: () => void;
}

export default function BillCard({
  id,
  amount,
  dueDate,
  period,
  status,
  onPress,
  onDownload,
}: BillCardProps) {
  const statusConfig = {
    paid: {
      text: 'Payée',
      color: Colors.success,
      icon: CheckCircle,
    },
    pending: {
      text: 'En attente',
      color: Colors.warning,
      icon: Clock,
    },
    overdue: {
      text: 'En retard',
      color: Colors.error,
      icon: AlertCircle,
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={onPress}>
        <View style={styles.mainInfo}>
          <Text style={styles.billId}>Facture #{id}</Text>
          <Text style={styles.period}>{period}</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount.toLocaleString()} FCFA</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.dateContainer}>
            <Clock size={16} color={Colors.text.muted} />
            <Text style={styles.dateText}>Échéance: {dueDate}</Text>
          </View>

          <View style={[styles.statusContainer, { backgroundColor: currentStatus.color + '15' }]}>
            <currentStatus.icon size={16} color={currentStatus.color} />
            <Text style={[styles.statusText, { color: currentStatus.color }]}>
              {currentStatus.text}
            </Text>
          </View>
        </View>

        {status !== 'paid' && (
          <TouchableOpacity style={styles.payButton} onPress={onPress}>
            <Text style={styles.payText}>Payer maintenant</Text>
          </TouchableOpacity>
        )}

        {onDownload && (
          <TouchableOpacity style={styles.downloadButton} onPress={onDownload}>
            <Download size={20} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  mainInfo: {
    marginBottom: 12,
  },
  billId: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
  },
  period: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    marginBottom: 8,
  },
  amountContainer: {
    marginTop: 8,
  },
  amount: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.primary,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  payButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  payText: {
    color: Colors.white,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  downloadButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
  },
});