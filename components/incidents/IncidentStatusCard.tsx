import { View, Text, StyleSheet } from 'react-native';
import { Clock, CircleCheck as CheckCircle, PenTool as Tool, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';

export type IncidentStatus = 'pending' | 'processing' | 'resolved' | 'closed';

interface IncidentStatusCardProps {
  id: string;
  type: string;
  location: string;
  reportDate: string;
  status: IncidentStatus;
  description?: string;
}

export default function IncidentStatusCard({
  id,
  type,
  location,
  reportDate,
  status,
  description,
}: IncidentStatusCardProps) {
  const statusConfig = {
    pending: {
      text: 'En attente',
      color: Colors.warning,
      icon: Clock,
    },
    processing: {
      text: 'En cours',
      color: Colors.primary,
      icon: Tool,
    },
    resolved: {
      text: 'Résolu',
      color: Colors.success,
      icon: CheckCircle,
    },
    closed: {
      text: 'Fermé',
      color: Colors.grey[600],
      icon: AlertTriangle,
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card>
      <View style={styles.header}>
        <View>
          <Text style={styles.id}>Incident #{id}</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
        <View style={[styles.statusContainer, { backgroundColor: currentStatus.color + '15' }]}>
          <currentStatus.icon size={16} color={currentStatus.color} />
          <Text style={[styles.statusText, { color: currentStatus.color }]}>
            {currentStatus.text}
          </Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Lieu:</Text>
        <Text style={styles.detailValue}>{location}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Signalé le:</Text>
        <Text style={styles.detailValue}>{reportDate}</Text>
      </View>

      {description && (
        <View style={styles.description}>
          <Text style={styles.descriptionLabel}>Description:</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}

      <View style={styles.timeline}>
        <View style={[styles.timelineStep, styles.timelineStepCompleted]}>
          <View style={styles.timelineStepDot}>
            <CheckCircle size={16} color={Colors.white} />
          </View>
          <Text style={styles.timelineStepText}>Reçu</Text>
        </View>

        <View
          style={[
            styles.timelineLine,
            status === 'pending' ? styles.timelineInactive : styles.timelineActive,
          ]}
        />

        <View
          style={[
            styles.timelineStep,
            status !== 'pending' ? styles.timelineStepCompleted : styles.timelineStepInactive,
          ]}
        >
          <View style={styles.timelineStepDot}>
            {status !== 'pending' ? (
              <CheckCircle size={16} color={Colors.white} />
            ) : (
              <Text style={styles.timelineStepNumber}>2</Text>
            )}
          </View>
          <Text style={styles.timelineStepText}>En traitement</Text>
        </View>

        <View
          style={[
            styles.timelineLine,
            status === 'resolved' || status === 'closed'
              ? styles.timelineActive
              : styles.timelineInactive,
          ]}
        />

        <View
          style={[
            styles.timelineStep,
            status === 'resolved' || status === 'closed'
              ? styles.timelineStepCompleted
              : styles.timelineStepInactive,
          ]}
        >
          <View style={styles.timelineStepDot}>
            {status === 'resolved' || status === 'closed' ? (
              <CheckCircle size={16} color={Colors.white} />
            ) : (
              <Text style={styles.timelineStepNumber}>3</Text>
            )}
          </View>
          <Text style={styles.timelineStepText}>Résolu</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  id: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.primary,
  },
  type: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
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
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.muted,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
  },
  description: {
    marginTop: 8,
    marginBottom: 16,
  },
  descriptionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.muted,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 8,
  },
  timelineStep: {
    alignItems: 'center',
    width: 80,
  },
  timelineStepCompleted: {
    opacity: 1,
  },
  timelineStepInactive: {
    opacity: 0.6,
  },
  timelineStepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineStepNumber: {
    color: Colors.white,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  timelineStepText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  timelineLine: {
    height: 2,
    flex: 1,
    marginHorizontal: 4,
  },
  timelineActive: {
    backgroundColor: Colors.primary,
  },
  timelineInactive: {
    backgroundColor: Colors.grey[300],
  },
});