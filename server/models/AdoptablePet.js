import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/adopt-me"
})

class AdoptablePet {
  constructor({id, name, imgUrl, img_url, age, vaccinationStatus, vaccination_status, adoptionStory, adoption_story, availableForAdoption, available_for_adoption, petTypeId, pet_type_id}) {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl || img_url
    this.age = age
    this.vaccinationStatus = vaccinationStatus || vaccination_status || false
    this.adoptionStory = adoptionStory || adoption_story
    this.availableForAdoption = availableForAdoption || available_for_adoption || true
    this.petTypeId = petTypeId || pet_type_id
  }

  static async findAll() {
    try {
      const queryString = "SELECT * FROM adoptable_pets;"
      const result = await pool.query(queryString)
      const adoptablePetsData = result.rows
      const adoptablePets = adoptablePetsData.map(adoptablePet => new this(adoptablePet))
      return adoptablePets
    } catch (error) {
      console.log(error)
      throw(error)
    }
  }
}

export default AdoptablePet