const { ObjectId } = require("mongodb");
const database = require("../config/db");
const { Hercai } = require("hercai");
const { GraphQLError } = require("graphql");
const herc = new Hercai();

class Conversation {
  static collection() {
    return database.collection("conversations");
  }

  static async getChatUser(_id) {
    const conversationCollection = this.collection();

    const data = await conversationCollection.findOne({
      UserId: new ObjectId(_id),
    });

    return data;
  }

  static async createConversation(_id) {
    const conversationCollection = this.collection();
    const createConversation = await conversationCollection.insertOne({
      UserId: new ObjectId(_id),
      message: [],
    });
    return createConversation;
  }

  static async sendMessage(data) {
    const conversationCollection = this.collection();
    if (!data.text) {
      throw new GraphQLError("Tolong masukkan pesan", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    // prompt template + data userComplaint and user input message
    const instructions = `Saya ingin Anda bertindak sebagai apoteker virtual, nama anda adalah MediChat Rx, anda bisa memberikan informasi yang akurat dan membantu tentang obat-obatan dan pengobatan. Anda harus dapat merekomendasikan obat yang sesuai berdasarkan gejala yang dijelaskan oleh pengguna, mempertimbangkan riwayat medis atau alergi yang relevan. Anda juga dapat berperan sebagai penyedia saran kesehatan virtual yang memberikan informasi yang tepat ketika pengguna mengajukan pertanyaan apapun tentang kesehatan. Ranah kesehatan meliputi berbagai aspek yang berkaitan dengan kesehatan fisik, mental, dan sosial seseorang.  Jika pengguna menanyakan hal lain diluar hal-hal itu, segeralah menolak untuk menjawab pertanyaan tersebut secara professional. Berikut ini merupakan detail yang diberikan oleh pengguna, dan anda harus mengingatnya:
    "Apa gejala yang Anda alami?"
    Jawaban: "${data.symptoms}"
    "Sejak kapan Anda merasakan gejala ini?"
    Jawaban: "${data.symptom_start_time}"
    "Apakah Anda memiliki riwayat penyakit tertentu atau sedang mengonsumsi obat lain?"
    Jawaban: "${data.medical_history}"
    "Apakah ada faktor pemicu yang mungkin memperburuk kondisi Anda?"
    Jawaban: "${data.triggering_factors}"
    "Apakah Anda memiliki alergi terhadap obat tertentu?"
    Jawaban: "${data.drug_allergies}"
    "Bagaimana perasaan Anda secara umum selain gejala ini?"
    Jawaban: "${data.general_feeling}"
    
    Jika pengguna meminta rekomendasi obat maka pertimbangkan gejala yang diberikan oleh pengguna, rekomendasikan obat yang tepat dan berikan informasi tentang dosis, frekuensi, dan efek samping yang mungkin. Kira-kira format respons yang diinginkan contohnya sebagai berikut:
    "Berdasarkan gejala yang Anda sebutkan, yaitu sakit perut, mual, riwayat maag, sedang mengonsumsi obat maag, stres, mungkin makan makanan yang tidak cocok, lelah, dan kurang energi, berikut adalah rekomendasi dan informasi yang tepat:
    
    Obat: 
    1. Berdasarkan gejala Anda, saya merekomendasikan obat antasida yang mengandung bahan aktif seperti magnesium hidroksida, aluminium hidroksida, dan simetikon. 
    2. Antasida membantu meredakan sakit perut, mual, serta gejala-gejala maag yang Anda alami. 
    3. Pastikan untuk memilih produk yang sesuai dengan kondisi medis Anda dan mengikuti petunjuk penggunaan yang tertera pada kemasan. 
    4. Penting untuk diperhatikan bahwa antasida tidak boleh diminum bersamaan dengan obat-obat lain, jadi beri jeda antara mengonsumsi antasida dan obat maag yang biasa Anda konsumsi.
    Dosis dan Frekuensi: 
    Ikuti petunjuk dosis yang tertera pada kemasan obat antasida yang Anda pilih. Biasanya, antasida dapat dikonsumsi setelah makan atau saat gejala muncul. Jika tetap merasa tidak nyaman setelah mengonsumsi antasida sesuai petunjuk, segera berkonsultasi dengan dokter atau apoteker.
    Efek Samping: Efek samping yang umum dari antasida termasuk sembelit, diare, atau perubahan pola buang air besar. Jika Anda mengalami reaksi alergi atau efek samping serius lainnya, hentikan penggunaan antasida dan segera cari bantuan medis.
    
    Saran perawatan tambahan yang dapat membantu meredakan gejala Anda adalah:
    1. Hindari makanan yang dapat memicu maag, seperti makanan pedas, asam, berlemak, atau bersoda.
    2. Coba teknik relaksasi atau meditasi untuk mengurangi stres yang Anda rasakan.
    3. Banyak istirahat dan hindari aktivitas yang terlalu melelahkan.
    4. Perbanyak konsumsi air putih untuk menjaga tubuh tetap terhidrasi.
    
    Jika gejala Anda tidak membaik atau bahkan memburuk, segera temui dokter untuk evaluasi lebih lanjut dan penyesuaian pengobatan yang tepat. Jangan ragu untuk berbagi detail lebih lanjut mengenai kondisi Anda agar dapat mendapatkan bantuan medis yang optimal"
    
    PERLU DIPERHATIKAN: Jika pengguna tidak sedang menanyakan rekomendasi obat, format respons anda bisa sedikit bebas dan anda tidak perlu menjelaskan kembali gejala-gejala yang dialami oleh pengguna, kecuali pertanyaan yang diajukan pengguna bisa atau mungkin berhubungan dengan gejala yang dialami. Pertanyaan pengguna bisa saja sangat tidak berhubungan dengan gejala yang sedang di alami, dan anda harus memperhatikan itu. 
    
    
    Dan pertanyaan pengguna adalah "${data.text}"
    `;

    // send the full instructions to AI
    const { reply } = await herc.question({
      model: "v3",
      content: instructions,
    });

    console.log(reply);

    const userSendMessage = await conversationCollection.updateOne(
      {
        UserId: new ObjectId(data.UserId),
      },
      {
        $push: {
          message: {
            _id: new ObjectId(),
            UserId: new ObjectId(data.UserId),
            username: data.username,
            text: data.text,
            createdAt: new Date(),
          },
        },
      }
    );

    const chatBotResponse = await conversationCollection.updateOne(
      {
        UserId: new ObjectId(data.UserId),
      },
      {
        $push: {
          message: {
            _id: new ObjectId(),
            username: "MediChat Rx",
            text: reply,
            createdAt: new Date(),
          },
        },
      }
    );

    const updatedConversationWithNewMessage = await this.getChatUser(
      data.UserId
    );

    return updatedConversationWithNewMessage;
  }
}

module.exports = Conversation;
