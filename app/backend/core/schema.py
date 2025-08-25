# back/core/schema.py
import graphene
from graphene_django import DjangoObjectType
from .models import Patient, Vital, Appointment
from django.contrib.auth.models import User

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email")

class PatientType(DjangoObjectType):
    class Meta:
        model = Patient

class VitalType(DjangoObjectType):
    class Meta:
        model = Vital

class AppointmentType(DjangoObjectType):
    class Meta:
        model = Appointment

class Query(graphene.ObjectType):
    all_patients = graphene.List(PatientType)
    all_appointments = graphene.List(AppointmentType)
    patient_vitals = graphene.List(VitalType, patient_id=graphene.Int(required=True))

    def resolve_all_patients(root, info):
        return Patient.objects.all()

    def resolve_all_appointments(root, info):
        return Appointment.objects.all()

    def resolve_patient_vitals(root, info, patient_id):
        return Vital.objects.filter(patient_id=patient_id)

class CreatePatient(graphene.Mutation):
    patient = graphene.Field(PatientType)

    class Arguments:
        name = graphene.String(required=True)
        age = graphene.Int(required=True)
        condition = graphene.String(required=True)
        status = graphene.String(required=True)

    def mutate(self, info, name, age, condition, status):
        patient = Patient(name=name, age=age, condition=condition, status=status)
        patient.save()
        return CreatePatient(patient=patient)

class Mutation(graphene.ObjectType):
    create_patient = CreatePatient.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
