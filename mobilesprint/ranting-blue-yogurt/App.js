import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [tela, setTela] = useState("login");
  const [consultas, setConsultas] = useState([]);

  /* ============================================================
        TELAS DO APLICATIVO
  ============================================================ */

  // ------------------ LOGIN ------------------
  function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function validar() {
      if (!email || !senha) {
        Alert.alert("Erro", "Preencha todos os campos!");
        return;
      }
      setTela("home");
    }

    return (
      <View style={styles.center}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3874/3874405.png",
          }}
          style={styles.logo}
        />

        <Text style={styles.title}>TeleCare</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.btn} onPress={validar}>
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ------------------ HOME ------------------
  function Home() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.title}>Bem-vindo ao TeleCare</Text>

        <Image
          source={{ uri: "https://picsum.photos/500" }}
          style={styles.banner}
        />

        <TouchableOpacity style={styles.btn} onPress={() => setTela("agendar")}>
          <Text style={styles.btnText}>Agendar Consulta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn2}
          onPress={() => setTela("agendadas")}
        >
          <Text style={styles.btnText2}>Consultas Agendadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn2} onPress={() => setTela("perfil")}>
          <Text style={styles.btnText2}>Perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ------------------ AGENDA ------------------
  function Agendar() {
    const [especialidade, setEspecialidade] = useState("cardio");
    const [horario, setHorario] = useState("10h");

    function salvar() {
      const nova = { id: Date.now(), especialidade, horario };
      setConsultas([...consultas, nova]);
      Alert.alert("Sucesso", "Consulta agendada!");
    }

    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.title}>Agendar Consulta</Text>

        <Text style={styles.label}>Especialidade</Text>
        <Picker
          selectedValue={especialidade}
          onValueChange={setEspecialidade}
          style={styles.picker}
        >
          <Picker.Item label="Cardiologia" value="cardio" />
          <Picker.Item label="Pediatria" value="pediatria" />
          <Picker.Item label="Clínico Geral" value="geral" />
        </Picker>

        <Text style={styles.label}>Horário</Text>
        <Picker
          selectedValue={horario}
          onValueChange={setHorario}
          style={styles.picker}
        >
          <Picker.Item label="10:00" value="10h" />
          <Picker.Item label="14:00" value="14h" />
          <Picker.Item label="16:00" value="16h" />
        </Picker>

        <TouchableOpacity style={styles.btn} onPress={salvar}>
          <Text style={styles.btnText}>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn2} onPress={() => setTela("home")}>
          <Text style={styles.btnText2}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ------------------ CONSULTAS AGENDADAS ------------------
  function Agendadas() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.title}>Consultas Agendadas</Text>

        {consultas.length === 0 && (
          <Text style={{ fontSize: 16 }}>Nenhuma consulta agendada.</Text>
        )}

        {consultas.map((c) => (
          <View key={c.id} style={styles.card}>
            <Text style={styles.cardName}>{c.especialidade}</Text>
            <Text style={styles.cardSub}>Horário: {c.horario}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.btn2} onPress={() => setTela("home")}>
          <Text style={styles.btnText2}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ------------------ PERFIL MELHORADO ------------------
  function Perfil() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [tipoSangue, setTipoSangue] = useState("A+");
    const [plano, setPlano] = useState("nenhum");

    function salvarPerfil() {
      Alert.alert("Sucesso", "Dados de perfil atualizados!");
    }

    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.title}>Meu Perfil</Text>

        <View style={styles.perfilCard}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            }}
            style={styles.fotoPerfil}
          />

          <Text style={styles.cardName}>{nome || "Usuário"}</Text>
          <Text style={styles.cardSub}>Informações cadastrais</Text>
        </View>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          placeholder="Digite seu nome"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          placeholder="Digite sua idade"
          style={styles.input}
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          placeholder="(00) 00000-0000"
          style={styles.input}
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text style={styles.label}>Tipo Sanguíneo</Text>
        <Picker
          style={styles.picker}
          selectedValue={tipoSangue}
          onValueChange={setTipoSangue}
        >
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="O-" value="O-" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="AB-" value="AB-" />
        </Picker>

        <Text style={styles.label}>Plano de Saúde</Text>
        <Picker
          style={styles.picker}
          selectedValue={plano}
          onValueChange={setPlano}
        >
          <Picker.Item label="Nenhum" value="nenhum" />
          <Picker.Item label="Unimed" value="unimed" />
          <Picker.Item label="Bradesco Saúde" value="bradesco" />
          <Picker.Item label="Amil" value="amil" />
          <Picker.Item label="SulAmérica" value="sulamerica" />
        </Picker>

        <TouchableOpacity style={styles.btn} onPress={salvarPerfil}>
          <Text style={styles.btnText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn2} onPress={() => setTela("home")}>
          <Text style={styles.btnText2}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  /* ============================================================
        ROTEAMENTO MANUAL ENTRE TELAS
  ============================================================ */
  if (tela === "login") return <Login />;
  if (tela === "home") return <Home />;
  if (tela === "agendar") return <Agendar />;
  if (tela === "agendadas") return <Agendadas />;
  if (tela === "perfil") return <Perfil />;
}

/* ============================================================
        ESTILOS
============================================================ */
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#4a90e2",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  btn2: {
    backgroundColor: "white",
    borderColor: "#4a90e2",
    borderWidth: 2,
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  btnText2: {
    color: "#4a90e2",
    fontSize: 18,
  },
  banner: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
  },
  cardName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSub: {
    fontSize: 16,
    color: "#555",
  },
  perfilCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },
  fotoPerfil: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },
});
