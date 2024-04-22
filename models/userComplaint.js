const { ObjectId } = require("mongodb");
const database = require("../config/db");
const { GraphQLError } = require("graphql");
const validator = require("validator");

const dummyData = {
  symptoms:
    "Saya merasa sakit tenggorokan, hidung tersumbat, dan sedikit demam.",
  symptom_start_time:
    "Gejala ini mulai dirasakan sekitar dua hari yang lalu, tapi tidak terlalu mengganggu aktivitas sehari-hari.",
  medical_history:
    "Saya memiliki riwayat alergi ringan dan biasanya mengonsumsi obat alergi over-the-counter untuk itu",
  triggering_factors:
    "Mungkin karena pergantian musim dan cuaca yang tidak menentu belakangan ini.",
  drug_allergies: "Ya, saya memiliki alergi terhadap beberapa jenis antibiotik",
  general_feeling:
    "Selain gejala ini, saya merasa cukup baik dan masih bisa menjalani aktivitas sehari-hari dengan normal.",
  createdAt: new Date(),
  updatedAt: new Date(),
};

class userComplaint {
  static collection() {
    return database.collection("userComplaints");
  }

  static async findUserComplaint(_id) {
    const userComplaintCollection = this.collection();

    const data = await userComplaintCollection.findOne({
      UserId: new ObjectId(_id),
    });

    return data;
  }

  static async createUserComplaint(data) {
    const userComplaintCollection = this.collection();

    if (
      !data.symptoms &&
      !data.symptom_start_time &&
      !data.medical_history &&
      !data.triggering_factors &&
      !data.general_feeling &&
      !data.drug_allergies
    ) {
      throw new GraphQLError("Tolong ceritakan mengenai keluhan apa yang kamu alami!", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!data.symptoms) {
      throw new GraphQLError("Tolong isi gejala apa yang kamu alami!", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!data.symptom_start_time) {
      throw new GraphQLError(
        "Tolong isi sejak kapan gejala ini mulai dirasakan!",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    if (!data.medical_history) {
      throw new GraphQLError(
        "Tolong isi mengenai riwayat penyakit anda, jika tidak ada anda bisa mengisi 'Tidak ada'",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    if (!data.triggering_factors) {
      throw new GraphQLError(
        "Tolong isi mengenai faktor pemicu yang mungkin memperburuk penyakit anda, jika tidak tahu anda bisa mengisi 'tidak tahu'",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    if (!data.drug_allergies) {
      throw new GraphQLError(
        "Tolong isi jika anda mempunyai alergi terhadap suatu obat, jika tidak anda dapat mengisi 'Tidak, saya tidak memiliki alergi terhadap obat-obatan.' ",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    if (!data.general_feeling) {
      throw new GraphQLError(
        "Tolong ceritakan mengenai perasaan anda secara umum selain gejala ini",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    const findUserComplaint = await this.findUserComplaint(data.UserId);
    if (findUserComplaint) {
      throw new GraphQLError(
        "A complaint associated with this user is already exist, try updating a new one instead",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    const result = await userComplaintCollection.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newUserComplaint = await this.findUserComplaint(data.UserId);

    return newUserComplaint;
  }

  static async updateUserComplaint(data) {
    const userComplaintCollection = this.collection();
    if (
      !data.symptoms &&
      !data.symptom_start_time &&
      !data.medical_history &&
      !data.triggering_factors &&
      !data.general_feeling &&
      !data.drug_allergies
    ) {
      throw new GraphQLError("Tolong ceritakan mengenai keluhan apa yang kamu alami!", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!data.symptoms) {
      throw new GraphQLError("Tolong isi gejala apa yang kamu alami!", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (!data.symptom_start_time) {
      throw new GraphQLError(
        "Tolong isi sejak kapan gejala ini mulai dirasakan!",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    if (!data.medical_history) {
      throw new GraphQLError(
        "Tolong isi mengenai riwayat penyakit anda, jika tidak ada anda bisa mengisi 'Tidak ada'",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    if (!data.triggering_factors) {
      throw new GraphQLError(
        "Tolong isi mengenai faktor pemicu yang mungkin memperburuk penyakit anda, jika tidak tahu anda bisa mengisi 'tidak tahu'",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    if (!data.drug_allergies) {
      throw new GraphQLError(
        "Tolong isi jika anda mempunyai alergi terhadap suatu obat, jika tidak anda dapat mengisi 'Tidak, saya tidak memiliki alergi terhadap obat-obatan.' ",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    if (!data.general_feeling) {
      throw new GraphQLError(
        "Tolong ceritakan mengenai perasaan anda secara umum selain gejala ini",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    const {
      symptoms,
      symptom_start_time,
      medical_history,
      triggering_factors,
      general_feeling,
      drug_allergies,
    } = data;

    const result = await userComplaintCollection.findOneAndUpdate(
      {
        UserId: new ObjectId(data.UserId),
      },
      {
        $set: {
          symptoms,
          symptom_start_time,
          medical_history,
          triggering_factors,
          drug_allergies,
          general_feeling,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: "after",
      }
    );

    return result;
  }
}

module.exports = userComplaint;
