import Label from "@/components/ui/Label"
import { getStatusVariant } from "@/lib/utils"
import type { TeacherDTO } from "@/types/types"
import styles from "./teacherInfoForm.module.css"
import { Icons } from "@/assets"
import { useEffect, useState } from "react"
import Button from "@/components/ui/Button"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useMutation } from "@tanstack/react-query"
import { TeacherService } from "@/services/TeacherService"
import { TeacherFormSchema } from "@/validations/teacherFormValidation"
import { Input } from "@/components/ui/input"
import { LanguageMultiSelect } from "@/components/ui/LanguageMultiSelect"
import SubjectSelector from "@/components/ui/SubjectSelector"
import { availableSubjects } from "@/constant/subjects"
import { useTeacherInfoController } from "@/hooks/useTeacherInfoController"

const TeacherInfoForm = ({ teacher, type }: { teacher: TeacherDTO, type: "edit" | "add" }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    // const [sendedMessage, setSendedMessage] = useState(false);
    const { closePanel } = useTeacherInfoController();

    const steps = ["Şəxsi məlumatlar", "Akademik məlumatlar", "Tədris etdiyi fənlər"]
    const teacherInitialValues: Omit<TeacherDTO, 'id' | 'avatar' | 'fullName' | 'status'> = {
        personalInformation: {
            name: teacher.personalInformation.name,
            surname: teacher.personalInformation.surname,
            fatherName: teacher.personalInformation.fatherName,
            gender: teacher.personalInformation.gender,
            birthDate: teacher.personalInformation.birthDate,
            idSeries: teacher.personalInformation.idSeries,
            idNumber: teacher.personalInformation.idNumber,
            fincode: teacher.personalInformation.fincode,
            username: teacher.personalInformation.username,
            citizenship: teacher.personalInformation.citizenship,
            socialStatus: teacher.personalInformation.socialStatus,
            socialCondition: teacher.personalInformation.socialCondition,
            maritalStatus: teacher.personalInformation.maritalStatus,
            militaryStatus: teacher.personalInformation.militaryStatus,
            disabilityStatus: teacher.personalInformation.disabilityStatus,
            employmentStartDate: teacher.personalInformation.employmentStartDate,
        },
        contactInformation: {
            mobileNumber: teacher.contactInformation.mobileNumber,
            internalNumber: teacher.contactInformation.internalNumber,
            address: teacher.contactInformation.address,
            registrationAddress: teacher.contactInformation.registrationAddress,
            email: teacher.contactInformation.email,
        },
        academicInformation: {
            department: teacher.academicInformation.department,
            academicDegree: teacher.academicInformation.academicDegree,
            academicTitle: teacher.academicInformation.academicTitle,
            maxHours: teacher.academicInformation.maxHours,
            positionType: teacher.academicInformation.positionType,
            employmentType: teacher.academicInformation.employmentType,
            languagesTaught: teacher.academicInformation.languagesTaught,
            foreignLanguages: teacher.academicInformation.foreignLanguages,
        },
        subjects: type == "add" ? [] : teacher.subjects,
        files: teacher.files,
    };

    const increaseTabIndex = () => {
        setActiveIndex(activeIndex + 1)
    }

    const decreaseTabIndex = () => {
        setActiveIndex(activeIndex - 1)
    }

    const addTeacherMutation = useMutation({
        mutationFn: async (teacherData: Omit<TeacherDTO, 'id' | 'avatar' | 'fullName' | "status">) => {
            setIsSubmitting(true)
            const result = await TeacherService.addTeacher(teacherData)
            return result
        },
        onSuccess: (data) => {
            console.log("Teacher added successfully:", data)
        },
        onError: (error) => {
            console.error("Error adding teacher:", error)
        },
        onSettled: () => {
            setIsSubmitting(false)
        }
    })

    const updateTeacherMutation = useMutation({
        mutationFn: async ({
            id,
            teacherData,
        }: {
            id: number
            teacherData: Omit<TeacherDTO, "id" | "avatar" | "fullName" | "status">
        }) => {
            setIsSubmitting(true)
            const result = await TeacherService.updateTeacher(id, teacherData)
            return result
        },

        onSuccess: (data) => {
            console.log("Teacher updated successfully:", data)
        },

        onError: (error) => {
            console.error("Error updating teacher:", error)
        },

        onSettled: () => {
            setIsSubmitting(false)
        },
    })


    useEffect(() => {
        setActiveIndex(0)
    }, [teacher])

    return (
        <>
            <div className="flex flex-col gap-6 h-full">
                <div className={styles.headerInfo}>
                    <div className={styles.avatarContainer}>
                        <img className={styles.avatar} src={teacher?.avatar} alt={teacher.fullName} />
                    </div>
                    <div className={styles.headerContent}>
                        <h6 className={styles.teacherTitle}>{teacher?.fullName}</h6>
                        <Label variant={getStatusVariant(teacher.status)}>{teacher.status}</Label>
                    </div>
                </div>
                <div className={styles["sidebar-form"]}>
                    <div className={styles.sidebar}>
                        <ul className="flex flex-col">
                            {steps.map((item, index) => (
                                <li key={index}>
                                    <div className={`${styles.step} ${activeIndex == index ? styles.active : ""}`}>
                                        <div className="relative">
                                            <div className={`${styles.dot}`}>
                                                <Icons.doneStep width={24} height={24} className={`${styles.icon} ${activeIndex > index ? styles.active : ""}`} />
                                                <Icons.activeStep width={24} height={24} className={`${styles.icon} ${activeIndex == index ? styles.active : ""}`} />
                                                <Icons.step width={24} height={24} className={`${styles.icon} ${activeIndex < index ? styles.active : ""}`} />
                                            </div>
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                    <div className={`w-6 h-[22px] py-1 flex justify-center ${steps.length - 1 == index ? "hidden" : ""}`}>
                                        <span className={`${styles.line} ${activeIndex > index ? styles.active : ""}`}>
                                            <span className={styles.lineInner}></span>
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="h-full flex flex-col gap-6 w-full">
                        <div className="h-full overflow-hidden relative">
                            <Formik
                                initialValues={teacherInitialValues}
                                validationSchema={TeacherFormSchema}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    if (type == "add") {
                                        addTeacherMutation.mutate(values, {
                                            onSuccess: () => {
                                                resetForm()
                                                // setSendedMessage(true);
                                                // setInterval(() => {
                                                //     setSendedMessage(false);
                                                // }, 2499);
                                                closePanel()
                                            },
                                            onSettled: () => {
                                                setSubmitting(false)
                                            }
                                        })
                                    } else {
                                        updateTeacherMutation.mutate({ id: teacher.id, teacherData: values }, {
                                            onSuccess: () => {
                                                resetForm()
                                                // setSendedMessage(true);
                                                // setInterval(() => {
                                                //     setSendedMessage(false);
                                                // }, 2499);
                                                closePanel()
                                            },
                                            onSettled: () => {
                                                setSubmitting(false)
                                            }
                                        })
                                    }
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="h-full" id={`teacher-${type}-form`}>
                                        <div className={styles.form}>
                                            <div className="max-w-[572px] w-full">
                                                <div className="flex items-center gap-2 text-text-color mb-6">
                                                    <Icons.user width={20} height={20} />
                                                    <span className="label1 font-semibold">Şəxsi məlumatlar</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                                                    <Input name="personalInformation.name" id="name" placeholder="Adınızı daxil edin" label="Ad" disabled />
                                                    <Input name="personalInformation.surname" id="surname" label="Soyad" disabled />
                                                    <Input name="personalInformation.fatherName" id="fatherName" label="Ata adı" disabled />
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">
                                                            Cins <span className="text-error-message">*</span>
                                                        </label>
                                                        <div className="flex gap-4">
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="personalInformation.gender"
                                                                    value="Kişi"
                                                                    checked={values.personalInformation.gender === "Kişi"}
                                                                    onChange={() => setFieldValue("personalInformation.gender", "Kişi")}
                                                                    className="w-4 h-4"
                                                                />
                                                                <span>Kişi</span>
                                                            </label>
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="personalInformation.gender"
                                                                    value="Qadın"
                                                                    checked={values.personalInformation.gender === "Qadın"}
                                                                    onChange={() => setFieldValue("personalInformation.gender", "Qadın")}
                                                                    className="w-4 h-4"
                                                                />
                                                                <span>Qadın</span>
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="personalInformation.gender" component="div" className="text-error-message label1" />
                                                    </div>
                                                    <Input icon={Icons.calendar} name="personalInformation.birthDate" placeholder="DD.MM.YYYY" id="birthDate" label="Doğum tarixi" required />
                                                    <Input name="personalInformation.idNumber" id="idNumber" label="ŞV seriya nömrəsi" required />
                                                    <Input name="personalInformation.fincode" id="fincode" label="FIN kod" required />
                                                    <Input name="personalInformation.citizenship" id="citizenship" label="Vətəndaşlıq" disabled />
                                                    <Input name="personalInformation.maritalStatus" id="maritalStatus" label="Ailə vəziyyəti" disabled />
                                                    <Input name="personalInformation.socialCondition" id="socialCondition" label="Sosial vəziyyəti" disabled />
                                                    <Input name="personalInformation.socialStatus" id="socialStatus" label="Sosial status" disabled />
                                                    <Input name="personalInformation.username" id="username" label="İstifadəçi adı" disabled />
                                                    <div >
                                                        <label className="block text-sm font-medium mb-2">
                                                            Hərbi vəziyyət <span className="text-error-message">*</span>
                                                        </label>
                                                        <div className="flex flex-wrap gap-4">
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="personalInformation.militaryStatus"
                                                                    value="Xidmət keçib"
                                                                    disabled
                                                                    checked={values.personalInformation.militaryStatus === "Xidmət keçib"}
                                                                    onChange={() => setFieldValue("personalInformation.militaryStatus", "Xidmət keçib")}
                                                                    className="w-4 h-4"
                                                                />
                                                                <span>Bəli</span>
                                                            </label>
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="personalInformation.militaryStatus"
                                                                    value="Xeyr"
                                                                    disabled
                                                                    checked={values.personalInformation.militaryStatus === "Yoxdur"}
                                                                    onChange={() => setFieldValue("personalInformation.militaryStatus", "Yoxdur")}
                                                                    className="w-4 h-4"
                                                                />
                                                                <span>Xeyr</span>
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="personalInformation.militaryStatus" component="div" className="text-error-message label1" />
                                                    </div>
                                                    <div >
                                                        <label className="block text-sm font-medium mb-2">
                                                            Əlillik statusu <span className="text-error-message">*</span>
                                                        </label>
                                                        <div className="flex flex-wrap gap-4">
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="personalInformation.disabilityStatus"
                                                                    value="Bəli"
                                                                    checked={values.personalInformation.disabilityStatus === "Bəli"}
                                                                    onChange={() => setFieldValue("personalInformation.disabilityStatus", "Bəli")}
                                                                    className="w-4 h-4"
                                                                    disabled
                                                                />
                                                                <span>Bəli</span>
                                                            </label>
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="personalInformation.disabilityStatus"
                                                                    value="Yoxdur"
                                                                    checked={values.personalInformation.disabilityStatus === "Yoxdur"}
                                                                    onChange={() => setFieldValue("personalInformation.disabilityStatus", "Yoxdur")}
                                                                    className="w-4 h-4"
                                                                    disabled
                                                                />
                                                                <span>Xeyr</span>
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="personalInformation.disabilityStatus" component="div" className="text-error-message label1" />
                                                    </div>
                                                    <Input icon={Icons.calendar} name="personalInformation.employmentStartDate" placeholder="DD.MM.YYYY" id="employmentStartDate" label="İşə başlama tarixi" required disabled />
                                                </div>
                                            </div>
                                            <div className="max-w-[572px] w-full">
                                                <div className="flex items-center gap-2 text-text-color mb-6">
                                                    <Icons.phone width={20} height={20} />
                                                    <span className="label1 font-semibold">Əlaqə məlumatları</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                                                    <Input name="contactInformation.address" id="address" label="Ünvan" disabled />
                                                    <Input name="contactInformation.registrationAddress" id="registrationAddress" label="Qeydiyyat ünvanı" disabled />
                                                    <Input name="contactInformation.mobileNumber" id="mobileNumber" label="Mobil nömrə" disabled />
                                                    <Input name="contactInformation.internalNumber" id="internalNumber" label="Daxili nömrə" disabled />
                                                    <Input name="contactInformation.email" id="email" label="E-poçt" disabled />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.form} ${activeIndex >= 1 ? styles.active : ""}`}>
                                            <div className="max-w-[572px] w-full">
                                                <div className="flex items-center gap-2 text-text-color mb-6">
                                                    <Icons.graduationHat width={20} height={20} />
                                                    <span className="label1 font-semibold">Akademik məlumatlar</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                                                    <Input name="academicInformation.department" id="department" label="Müəllimin əsas kafedrası" disabled />
                                                    <Input name="academicInformation.academicDegree" id="academicDegree" label="Elmi dərəcə" disabled />
                                                    <Input name="academicInformation.academicTitle" id="academicTitle" label="Elmi ad" disabled />
                                                    <Input name="academicInformation.maxHours" id="maxHours" label="Maksimal saat" required type="number" />
                                                    <div className="col-span-2">
                                                        <label htmlFor="positionType" className="block label1 font-medium mb-[6px]">
                                                            Ştat vahidi <span className="text-error-message">*</span>
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="academicInformation.positionType"
                                                            id="positionType"
                                                            className="w-full cursor-pointer px-3 py-[7.5px] border border-cloud-gray rounded-lg focus:outline-none label1 text-text-color"
                                                        >
                                                            <option value="">Seçin</option>
                                                            <option value="Tam ştat">Tam ştat</option>
                                                            <option value="0.5 Ştat">0.5 Ştat</option>
                                                            <option value="Saat hesabı">Saat hesabı</option>
                                                        </Field>
                                                        <ErrorMessage name="academicInformation.positionType" component="div" className="text-error-message label1 mt-1" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-6">
                                                <div className="flex items-center gap-2 text-text-color">
                                                    <Icons.language width={20} height={20} />
                                                    <span className="label1 font-semibold">Dil bilikləri</span>
                                                </div>
                                                <div>
                                                    <LanguageMultiSelect
                                                        name="academicInformation.languagesTaught"
                                                        label="Tədris aparıldığı dillər"
                                                        options={["Azərbaycan", "Rus", "İngilis", "Fransız", "Alman", "Türk", "İspan", "Çin"]}
                                                        values={values.academicInformation.languagesTaught}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                    <ErrorMessage name="academicInformation.languagesTaught" component="div" className="text-error-message label1 mt-1" />
                                                </div>
                                                <div>
                                                    <LanguageMultiSelect
                                                        name="academicInformation.foreignLanguages"
                                                        label="Tədris aparıldığı dillər"
                                                        options={["Azərbaycan", "Rus", "İngilis", "Fransız", "Alman", "Türk", "İspan", "Çin"]}
                                                        values={values.academicInformation.foreignLanguages}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                    <ErrorMessage name="academicInformation.foreignLanguages" component="div" className="text-error-message label1 mt-1" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.form} ${activeIndex == 2 ? styles.active : ""}`}>
                                            <div className="">
                                                <div className="flex items-center gap-2 text-text-color mb-6">
                                                    <Icons.bookOpen width={20} height={20} />
                                                    <span className="label1 font-semibold">Tədris etdiyi fənlər</span>
                                                </div>

                                                <SubjectSelector
                                                    name="subjects"
                                                    label="Tədris etdiyi fənnlər"
                                                    availableSubjects={availableSubjects}
                                                    selectedSubjects={values.subjects}
                                                    setFieldValue={setFieldValue}
                                                />
                                                <ErrorMessage name="subjects" component="div" className="text-error-message label1" />
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className="flex items-center justify-between">
                            <Button
                                className={activeIndex > 0 ? "" : "opacity-0 invisible"}
                                handleClick={() => decreaseTabIndex()}>
                                <Icons.leftArrow width={24} height={24} />
                                <span>Geri</span>
                            </Button>
                            <Button
                                handleClick={() => increaseTabIndex()}
                                className={activeIndex <= 1 ? "" : "opacity-0 invisible hidden"}>
                                <span>İrəli</span>
                                <Icons.leftArrow className="rotate-180" width={24} height={24} />
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                form={`teacher-${type}-form`}
                                className={activeIndex > 1 ? "" : "opacity-0 invisible hidden"}>
                                <span>{isSubmitting || addTeacherMutation.isPending ? "Yadda saxlanılır..." : "Yadda saxla"}</span>
                                <Icons.done width={24} height={24} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div
                className={`${styles["sendedMessage"]} ${sendedMessage ? " translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="label1 font-semibold text-sidebar-text-color flex items-center gap-4">
                    <div className="bg-[#DCFAE6] p-2.5 rounded-4xl">
                        <Icons.infoCircle color="#079455" width={20} height={20} />
                    </div>
                    Müəllim uğurla əlavə edildi
                </div>
                <button className="cursor-pointer" onClick={() => setSendedMessage(false)}>
                    <Icons.x width={20} height={20} />
                </button>
            </div> */}
        </>
    )
}

export default TeacherInfoForm