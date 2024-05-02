import { useState, useEffect } from "react";
import { useAppContext } from "../appContext.js";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AskScreen({ route, navigation }) {
  const { score, setScore, totalQuestions, setTotalQuestions } =
    useAppContext();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    const { questions } = route.params;
    setQuestions(questions);
    setTotalQuestions(questions.length);
  }, [route.params]);

  const HandleAnswer = (answer) => {
    setUserAnswer(answer);
  };

  const HandleNext = () => {
    if (
      userAnswer &&
      userAnswer === questions[currentQuestionIndex].correct_answer
    ) {
      setScore(score + 1);
    }

    setQuestionsAnswered(questionsAnswered + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer(null);

    if (currentQuestionIndex === questions.length - 1) {
      navigation.navigate("Result");
    }
  };

  if (questions.length === 0 || !questions[currentQuestionIndex]) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text>
        Score: {score}/ Answered Question(s): {questionsAnswered}/
        {totalQuestions}
      </Text>
      <Text>{currentQuestion.question}</Text>
      {currentQuestion.incorrect_answers
        .concat(currentQuestion.correct_answer)
        .sort(() => Math.random() - 0.5)
        .map((answer, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => HandleAnswer(answer)}
            disabled={userAnswer !== null}
          >
            <Text>{answer}</Text>
          </TouchableOpacity>
        ))}

      {userAnswer !== null && (
        <TouchableOpacity onPress={HandleNext}>
          <Text>Next Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
