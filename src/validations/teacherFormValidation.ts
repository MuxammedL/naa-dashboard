import * as Yup from "yup";

const namePattern = /^[A-Za-zƏəĞğİıÖöŞşÜüÇç\s-]+$/;
const finCodePattern = /^[0-9a-zA-Z]{7}$/;
const idSeriesPattern = /^[0-9]{8}$/;
const idNumberPattern = /^AZE\s\d{6}$/;
const phonePattern = /^\+994(50|51|55|70|77)\d{7}$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const TeacherFormSchema = Yup.object({
  personalInformation: Yup.object({
    name: Yup.string()
      .required("Ad daxil edilməlidir")
      .min(2, "Ad ən azı 2 simvoldan ibarət olmalıdır")
      .max(50, "Ad maksimum 50 simvoldan ibarət ola bilər")
      .matches(namePattern, "Ad yalnız hərflərdən ibarət olmalıdır"),

    surname: Yup.string()
      .required("Soyad daxil edilməlidir")
      .min(2, "Soyad ən azı 2 simvoldan ibarət olmalıdır")
      .max(50, "Soyad maksimum 50 simvoldan ibarət ola bilər")
      .matches(namePattern, "Soyad yalnız hərflərdən ibarət olmalıdır"),

    fatherName: Yup.string()
      .required("Ata adı daxil edilməlidir")
      .min(2, "Ata adı ən azı 2 simvoldan ibarət olmalıdır")
      .max(50, "Ata adı maksimum 50 simvoldan ibarət ola bilər")
      .matches(namePattern, "Ata adı yalnız hərflərdən ibarət olmalıdır"),

    gender: Yup.string()
      .required("Cins seçilməlidir")
      .oneOf(["Kişi", "Qadın"], "Yalnız 'Kişi' və ya 'Qadın' seçilə bilər"),

    birthDate: Yup.string()
      .required("Doğum tarixi daxil edilməlidir")
      .matches(
        /^\d{2}\.\d{2}\.\d{4}$/,
        "Doğum tarixi DD.MM.YYYY formatında olmalıdır"
      )
      .test("valid-date", "Doğum tarixi düzgün deyil", (value) => {
        if (!value) return false;
        const [day, month, year] = value.split(".").map(Number);
        const date = new Date(year, month - 1, day);
        return (
          date.getDate() === day &&
          date.getMonth() === month - 1 &&
          date.getFullYear() === year
        );
      })
      .test("age-range", "Yaş 18-75 arasında olmalıdır", (value) => {
        if (!value) return false;
        const [day, month, year] = value.split(".").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18 && age <= 75;
      }),

    idSeries: Yup.string()
      .required("Şəxsiyyət vəsiqəsinin seriyası daxil edilməlidir")
      .matches(
        idSeriesPattern,
        "Şəxsiyyət vəsiqəsinin seriyası 8 rəqəmdən ibarət olmalıdır"
      ),

    idNumber: Yup.string()
      .required("Şəxsiyyət vəsiqəsinin nömrəsi daxil edilməlidir")
      .matches(
        idNumberPattern,
        "Şəxsiyyət vəsiqəsinin nömrəsi 'AZE 123456' formatında olmalıdır"
      ),

    fincode: Yup.string()
      .required("FIN kod daxil edilməlidir")
      .matches(
        finCodePattern,
        "FIN kod 7 simvoldan (rəqəm və ya hərf) ibarət olmalıdır"
      ),

    username: Yup.string()
      .required("İstifadəçi adı daxil edilməlidir")
      .min(3, "İstifadəçi adı ən azı 3 simvoldan ibarət olmalıdır")
      .max(50, "İstifadəçi adı maksimum 50 simvoldan ibarət ola bilər")
      .matches(
        /^[a-z0-9._-]+$/,
        "İstifadəçi adı yalnız kiçik hərflər, rəqəmlər və '._-' simvollarından ibarət ola bilər"
      ),

    citizenship: Yup.string().required("Vətəndaşlıq seçilməlidir"),

    socialStatus: Yup.string().required("Sosial status seçilməlidir"),

    socialCondition: Yup.string().required("Sosial vəziyyət seçilməlidir"),

    maritalStatus: Yup.string()
      .required("Ailə vəziyyəti seçilməlidir")
      .oneOf(
        ["Subay", "Evli", "Boşanmış", "Dul"],
        "Düzgün ailə vəziyyəti seçilməlidir"
      ),

    militaryStatus: Yup.string()
      .required("Hərbi vəziyyət seçilməlidir")
      .oneOf(
        ["Yoxdur", "Xidmət keçib"],
        "Düzgün hərbi vəziyyət seçilməlidir"
      ),

    disabilityStatus: Yup.string()
      .required("Əlillik statusu seçilməlidir")
      .oneOf(
        ["Yoxdur", "I qrup", "II qrup", "III qrup"],
        "Düzgün əlillik statusu seçilməlidir"
      ),

    employmentStartDate: Yup.string()
      .required("İşə qəbul tarixi daxil edilməlidir")
      .matches(
        /^\d{2}\.\d{2}\.\d{4}$/,
        "İşə qəbul tarixi DD.MM.YYYY formatında olmalıdır"
      )
      .test("valid-date", "İşə qəbul tarixi düzgün deyil", (value) => {
        if (!value) return false;
        const [day, month, year] = value.split(".").map(Number);
        const date = new Date(year, month - 1, day);
        return (
          date.getDate() === day &&
          date.getMonth() === month - 1 &&
          date.getFullYear() === year
        );
      }),
  }),

  contactInformation: Yup.object({
    mobileNumber: Yup.string()
      .required("Mobil nömrə daxil edilməlidir")
      .matches(phonePattern, "Mobil nömrə +994XXXXXXXXX formatında olmalıdır"),

    internalNumber: Yup.string()
      .required("Daxili nömrə daxil edilməlidir")
      .matches(/^\d{4}$/, "Daxili nömrə 4 rəqəmdən ibarət olmalıdır"),

    address: Yup.string()
      .required("Yaşayış ünvanı daxil edilməlidir")
      .min(10, "Ünvan ən azı 10 simvoldan ibarət olmalıdır")
      .max(200, "Ünvan maksimum 200 simvoldan ibarət ola bilər"),

    registrationAddress: Yup.string()
      .required("Qeydiyyat ünvanı daxil edilməlidir")
      .min(10, "Ünvan ən azı 10 simvoldan ibarət olmalıdır")
      .max(200, "Ünvan maksimum 200 simvoldan ibarət ola bilər"),

    email: Yup.string()
      .required("Email daxil edilməlidir")
      .matches(emailPattern, "Email düzgün formatda olmalıdır")
      .email("Düzgün email ünvanı daxil edin"),
  }),

  academicInformation: Yup.object({
    department: Yup.string()
      .required("Kafedra seçilməlidir")
      .min(2, "Kafedra adı ən azı 2 simvoldan ibarət olmalıdır"),

    academicDegree: Yup.string()
      .required("Elmi dərəcə seçilməlidir")
      .oneOf(
        ["-", "Fəlsəfə doktoru", "Elmlər doktoru"],
        "Düzgün elmi dərəcə seçilməlidir"
      ),

    academicTitle: Yup.string()
      .required("Elmi ad seçilməlidir")
      .oneOf(
        ["-", "Baş müəllim", "Dosent", "Professor"],
        "Düzgün elmi ad seçilməlidir"
      ),

    maxHours: Yup.number()
      .required("Maksimum saat daxil edilməlidir")
      .min(0, "Maksimum saat 0-dan az ola bilməz")
      .max(1000, "Maksimum saat 1000-dən çox ola bilməz")
      .integer("Maksimum saat tam ədəd olmalıdır"),

    positionType: Yup.string()
      .required("Ştat vahidi seçilməlidir")
      .oneOf(
        ["Tam ştat", "0.5 Ştat", "Saat hesabı"],
        "Düzgün ştat vahidi seçilməlidir"
      ),

    employmentType: Yup.string()
      .required("İş növü seçilməlidir")
      .oneOf(["Əsas iş", "Əlavə iş"], "Düzgün iş növü seçilməlidir"),

    languagesTaught: Yup.array()
      .of(Yup.string())
      .min(1, "Ən azı bir tədris dili seçilməlidir")
      .required("Tədris dili seçilməlidir"),

    foreignLanguages: Yup.array()
      .of(Yup.string())
      .min(1, "Ən azı bir xarici dil məlumatı əlavə edilməlidir")
      .required("Xarici dil məlumatı tələb olunur"),
  }),

  subjects: Yup.array()
    .of(Yup.string().min(2, "Fənn adı ən azı 2 simvoldan ibarət olmalıdır"))
    .min(1, "Ən azı bir fənn əlavə edilməlidir")
    .required("Fənn məlumatı tələb olunur"),
});
