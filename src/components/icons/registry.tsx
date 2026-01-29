import type { Component } from "@builder.io/qwik";
import {
    FaTruckMedicalSolid,
    FaVanShuttleSolid,
    FaCalendarCheckSolid,
    FaTruckMonsterSolid,
    FaBedPulseSolid,
    FaUserDoctorSolid,
    FaHeartPulseSolid,
    FaClipboardListSolid,
    FaPuzzlePieceSolid,
    FaMapLocationDotSolid,
    FaSuitcaseMedicalSolid,
    FaCircleQuestionSolid, // Fallback
    // Target Icons
    FaBuildingSolid,
    FaBriefcaseMedicalSolid,
    FaHandHoldingMedicalSolid,
    FaLandmarkSolid,
    FaUsersSolid
} from "@qwikest/icons/font-awesome";
import {
    LuHeart,
    LuAward,
    LuZap,
    LuShieldCheck,
    // Social
    LuFacebook,
    LuInstagram,
    LuLinkedin
} from "@qwikest/icons/lucide";

export const ICON_REGISTRY: Record<string, Component<any>> = {
    // Mapping from 'iconName' (short version e.g. 'TruckMedical') to Component
    'TruckMedical': FaTruckMedicalSolid,
    'VanShuttle': FaVanShuttleSolid,
    'CalendarCheck': FaCalendarCheckSolid,
    'TruckMonster': FaTruckMonsterSolid,
    'BedPulse': FaBedPulseSolid,
    'UserDoctor': FaUserDoctorSolid,
    'HeartPulse': FaHeartPulseSolid,
    'ClipboardList': FaClipboardListSolid,
    'PuzzlePiece': FaPuzzlePieceSolid,
    'MapLocationDot': FaMapLocationDotSolid,
    'SuitcaseMedical': FaSuitcaseMedicalSolid,

    // Target Icons
    'Building': FaBuildingSolid,
    'BriefcaseMedical': FaBriefcaseMedicalSolid,
    'andHoldingMedical': FaHandHoldingMedicalSolid,
    'HandHoldingMedical': FaHandHoldingMedicalSolid,
    'Landmark': FaLandmarkSolid,
    'Users': FaUsersSolid,

    // Lucide Icons (Philosophy)
    'Heart': LuHeart,
    'Award': LuAward,
    'Zap': LuZap,
    'ShieldCheck': LuShieldCheck,

    // Social Media
    'Facebook': LuFacebook,
    'Instagram': LuInstagram,
    'Linkedin': LuLinkedin,

    // Mapping full component names just in case
    'FaTruckMedicalSolid': FaTruckMedicalSolid,
    'FaVanShuttleSolid': FaVanShuttleSolid,
    'FaCalendarCheckSolid': FaCalendarCheckSolid,
    'FaTruckMonsterSolid': FaTruckMonsterSolid,
    'FaBedPulseSolid': FaBedPulseSolid,
    'FaUserDoctorSolid': FaUserDoctorSolid,
    'FaHeartPulseSolid': FaHeartPulseSolid,
    'FaClipboardListSolid': FaClipboardListSolid,
    'FaPuzzlePieceSolid': FaPuzzlePieceSolid,
    'FaMapLocationDotSolid': FaMapLocationDotSolid,
    'FaSuitcaseMedicalSolid': FaSuitcaseMedicalSolid,

    'default': FaCircleQuestionSolid,
};
