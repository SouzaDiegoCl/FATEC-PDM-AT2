import Button from "@/components/Button";
import { ProfileStorage } from "@/services/profileStorage";
import { User } from "@/types/user";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Perfil() {
  const [profile, setProfile] = useState<User>({
    nome: "",
    sobrenome: "",
    idade: "",
    instituicao: "",
    curso: "",
  });

  useFocusEffect(
    useCallback(() => {
      async function loadProfile() {
        const savedProfile = await ProfileStorage.load();

        if (savedProfile) {
          setProfile(savedProfile);
        }
      }

      loadProfile();
    }, [])
  );

  const handleEditProfile = () => {
    router.push("/perfil/editar-perfil");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      {/* Foto padrão */}
      {/* <Image
        source={
          profile.fileUri
            ? { uri: profile.fileUri }
            : { uri: "https://github.com/i-davies.png" }
        }        
        style={styles.profileImage}
      /> */}

      {/* Informações do Perfil */}
      <View style={styles.profileInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nome:</Text>
          <Text style={styles.infoValue}>{profile.nome ? profile.nome : 'Não definido'}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Sobrenome:</Text>
          <Text style={styles.infoValue}>{profile.sobrenome ? profile.sobrenome : 'Não definido'}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Idade:</Text>
          <Text style={styles.infoValue}>{profile.idade ? profile.idade : 'Não definido'}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Instituição:</Text>
          <Text style={styles.infoValue}>{profile.instituicao ? profile.instituicao : 'Não definido'}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Curso:</Text>
          <Text style={styles.infoValue}>{profile.curso ? profile.curso : 'Não definido'}</Text>
        </View>
      </View>

      {/* Botões */}
      <View style={styles.footer}>
        <Button
          title="EDITAR PERFIL"
          variant="info"
          onPress={handleEditProfile}
        />
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
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#ffffffff",
  },
  footer: {
    width: "100%",
    gap: 12,
    paddingBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
    color: "#fff",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#272727ff",
    borderRadius: 0,
    borderBottomWidth: 2,     
    borderColor: "#fff",    
  },
});
