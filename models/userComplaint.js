const { ObjectId } = require("mongodb");
const database = require("../config/db");

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
}

module.exports = userComplaint;
