import { View, Text, StyleSheet } from 'react-native';
import { Zap, TrendingUp, TrendingDown, Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';

interface PowerUsageSummaryProps {
  currentUsage: number;
  previousUsage: number;
  billingPeriod: string;
}

export default function PowerUsageSummary({
  currentUsage,
  previousUsage,
  billingPeriod,
}: PowerUsageSummaryProps) {
  const usageDifference = currentUsage - previousUsage;
  const percentChange = ((usageDifference / previousUsage) * 100).toFixed(1);
  const isIncrease = usageDifference > 0;

  return (
    <Card>
      <View style={styles.header}>
        <Zap size={24} color={Colors.primary} />
        <Text style={styles.title}>Consommation actuelle</Text>
      </View>

      <View style={styles.usageContainer}>
        <Text style={styles.usageValue}>{currentUsage}</Text>
        <Text style={styles.usageUnit}>kWh</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.periodContainer}>
          <Calendar size={16} color={Colors.text.muted} />
          <Text style={styles.periodText}>{billingPeriod}</Text>
        </View>

        <View
          style={[
            styles.changeContainer,
            {
              backgroundColor: isIncrease ? Colors.error + '15' : Colors.success + '15',
            },
          ]}
        >
          {isIncrease ? (
            <TrendingUp size={16} color={Colors.error} />
          ) : (
            <TrendingDown size={16} color={Colors.success} />
          )}
          <Text
            style={[
              styles.changeText,
              { color: isIncrease ? Colors.error : Colors.success },
            ]}
          >
            {isIncrease ? '+' : ''}{percentChange}%
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  usageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  usageValue: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.primary,
  },
  usageUnit: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text.muted,
    marginLeft: 4,
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    marginLeft: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
});