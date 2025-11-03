import Button from "@/components/Button";
import { ProfileStorage } from "@/services/profileStorage";
import { User } from "@/types/user";
import { Picker } from "@react-native-picker/picker";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function EditProfileModal() {
  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [idade, setIdade] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [curso, setCurso] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function loadProfile() {
        const savedProfile: User | null = await ProfileStorage.load();

        if (savedProfile) {
          setName(savedProfile.nome ?? "");
          setSobrenome(savedProfile.sobrenome ?? "");
          setIdade(savedProfile.idade ?? "");
          setInstituicao(savedProfile.instituicao ?? "");
          setCurso(savedProfile.curso ?? "");
        }
      }

      loadProfile();
    }, [])
  );

  const handleSave = async () => {
    const updatedProfile: User = {
      nome: name.trim(),
      sobrenome: sobrenome.trim(),
      idade: idade.trim(),
      instituicao: instituicao.trim(),
      curso: curso.trim(),
    };

    await ProfileStorage.save(updatedProfile);
    handleCancel();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.profileInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nome:</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            placeholderTextColor="#fff"
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Sobrenome:</Text>
          <TextInput
            style={styles.textInput}
            value={sobrenome}
            onChangeText={setSobrenome}
            placeholder="Digite seu sobrenome"
            placeholderTextColor="#fff"
            keyboardType="default"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Idade:</Text>
          <TextInput
            style={styles.textInput}
            value={idade}
            onChangeText={setIdade}
            placeholder='Digite sua idade'
            placeholderTextColor="#fff"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Instituição:</Text>
          <TextInput
            style={styles.textInput}
            value={instituicao}
            onChangeText={setInstituicao}
            placeholder="Digite sua instituição"
            placeholderTextColor="#fff"
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Curso:</Text>
          <Picker
            selectedValue={curso}
            onValueChange={(itemValue, _itemIndex) => setCurso(itemValue)}
            style={styles.textInput}
          >
            <Picker.Item enabled={false} label="Selecione seu curso" value="" />
            <Picker.Item label="Programação de Dispositivos Móveis" value="PDM" />
            <Picker.Item label="Integração e Entrega Contínua" value="IEC" />            
          </Picker>
        </View>
      </View>

      <View style={styles.footer}>
        <Button style={{ flex: 1 }} title="SALVAR" variant="info" onPress={handleSave} />
        <Button style={{ flex: 1 }} title="Cancelar" variant="secondary" onPress={handleCancel} />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#272727ff",
    padding: 20,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 24,
    color: "#ffffffff",
  },
  footer: {
    width: "100%",
    gap: 8,    

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileInfo: {
    width: "100%",
    marginBottom: 40,
  },
  infoItem: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#dededeff",
    marginBottom: 5,
  }, 
  textInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#272727ff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ffffffff",
    color: "#ffffffff",
  },  
  preview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },  
});
