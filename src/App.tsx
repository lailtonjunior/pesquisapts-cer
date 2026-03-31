import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { ToastContainer } from './lib/toast';
import { useSurvey } from './hooks/useSurvey';
import { useAuth } from './hooks/useAuth';
import { supabase } from './lib/supabase';
import { generatePDF } from './lib/generatePDF';
import { exportToCSV } from './lib/exportCSV';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LoadingOverlay } from './components/layout/LoadingOverlay';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';

import { StepSelector } from './components/steps/StepSelector';
import { IdentificationStep } from './components/steps/IdentificationStep';
import { CompletionStep } from './components/steps/CompletionStep';
import { PTSPreviewStep } from './components/steps/PTSPreviewStep';
import { PrintView } from './components/steps/PrintView';

import { UpdateReasonsStep } from './components/steps/adult/UpdateReasonsStep';
import { RoutineStep as AdultRoutineStep } from './components/steps/adult/RoutineStep';
import { EcomapStep as AdultEcomapStep } from './components/steps/adult/EcomapStep';
import { GenogramStep as AdultGenogramStep } from './components/steps/adult/GenogramStep';

import { RoutineStep as ChildRoutineStep } from './components/steps/child/RoutineStep';
import { EcomapStep as ChildEcomapStep } from './components/steps/child/EcomapStep';
import { GenogramStep as ChildGenogramStep } from './components/steps/child/GenogramStep';

import type { SurveyData } from './types/survey';

type AppView = 'dashboard' | 'survey';

const pageVariants = {
  initial: { opacity: 0, x: 20, filter: 'blur(4px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -20, filter: 'blur(4px)' },
};

const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

function StepWrapper({ stepKey, children }: { stepKey: string; children: import('react').ReactNode }) {
  return (
    <motion.div
      key={stepKey}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const auth = useAuth();
  const survey = useSurvey();
  const [view, setView] = useState<AppView>('dashboard');
  const { step, data, isGenerating, isSaving, totalSteps, validationErrors } = survey;

  const handleNewSurvey = () => {
    survey.handleNewSurvey();
    setView('survey');
  };

  const handleViewSurvey = useCallback((surveyRecord: { survey_data?: SurveyData; pts_data?: Record<string, string> }) => {
    if (surveyRecord.survey_data) {
      const merged = {
        ...surveyRecord.survey_data,
        ...(surveyRecord.pts_data || {}),
      } as SurveyData;
      survey.loadSurvey(merged);
      setView('survey');
    }
  }, [survey]);

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  const handlePrintPDF = () => {
    generatePDF(data);
  };

  // Show loading spinner while checking auth
  if (auth.loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
      </div>
    );
  }

  // Show login screen if Supabase is configured but user is not authenticated
  if (supabase && !auth.isAuthenticated) {
    return (
      <>
        <ToastContainer />
        <LoginScreen onSignIn={auth.signIn} onSignUp={auth.signUp} />
      </>
    );
  }

  const stepProps = {
    data,
    onChange: survey.handleChange,
    onArrayChange: survey.handleArrayChange,
    onGenerateSynthesis: survey.handleGenerateSynthesis,
    isGenerating,
    validationErrors,
  };

  // Dashboard view
  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-200">
        <ToastContainer />
        <Dashboard
          onNewSurvey={handleNewSurvey}
          onViewSurvey={handleViewSurvey}
          onExportCSV={exportToCSV}
          authToken={auth.session?.access_token}
          userName={auth.user?.user_metadata?.full_name}
          onSignOut={auth.isAuthenticated ? auth.signOut : undefined}
        />
      </div>
    );
  }

  // Survey form view
  const renderStep = () => {
    if (step === 0) {
      return (
        <StepWrapper stepKey="step-0">
          <StepSelector onSelect={survey.handleSelectType} />
        </StepWrapper>
      );
    }

    if (step === 1) {
      return (
        <StepWrapper stepKey="step-1">
          <IdentificationStep {...stepProps} />
        </StepWrapper>
      );
    }

    if (step === 2 && data.surveyType === 'adult') {
      return (
        <StepWrapper stepKey="step-2-adult">
          <UpdateReasonsStep {...stepProps} />
        </StepWrapper>
      );
    }

    if (step === 2 && data.surveyType === 'child') {
      return (
        <StepWrapper stepKey="step-2-child">
          <ChildRoutineStep {...stepProps} />
        </StepWrapper>
      );
    }

    if (step === 3 && data.surveyType === 'adult') {
      return (
        <StepWrapper stepKey="step-3-adult">
          <AdultRoutineStep {...stepProps} />
        </StepWrapper>
      );
    }

    if (step === 3 && data.surveyType === 'child') {
      return (
        <StepWrapper stepKey="step-3-child">
          <ChildEcomapStep {...stepProps} />
        </StepWrapper>
      );
    }

    if (step === 4 && data.surveyType === 'adult') {
      return (
        <StepWrapper stepKey="step-4-adult">
          <AdultEcomapStep {...stepProps} />
        </StepWrapper>
      );
    }

    if (step === 4 && data.surveyType === 'child') {
      return (
        <StepWrapper stepKey="step-4-child">
          <ChildGenogramStep {...stepProps} />
        </StepWrapper>
      );
    }

    if (step === 5 && data.surveyType === 'adult') {
      return (
        <StepWrapper stepKey="step-5-adult">
          <AdultGenogramStep {...stepProps} />
        </StepWrapper>
      );
    }

    if (step === totalSteps - 2) {
      return (
        <StepWrapper stepKey="step-pts-preview">
          <PTSPreviewStep
            data={data}
            onChange={survey.handleChange}
            onRegenerateAI={(instructions) => survey.handleGenerateAI(instructions)}
            isGenerating={isGenerating}
          />
        </StepWrapper>
      );
    }

    if (step === totalSteps - 1) {
      return (
        <StepWrapper stepKey="step-final">
          <CompletionStep
            onPrint={handlePrintPDF}
            onNewSurvey={handleNewSurvey}
            onBackToDashboard={handleBackToDashboard}
          />
        </StepWrapper>
      );
    }

    if (step === totalSteps) {
      return (
        <StepWrapper stepKey="step-complete">
          <CompletionStep
            onPrint={handlePrintPDF}
            onNewSurvey={handleNewSurvey}
            onBackToDashboard={handleBackToDashboard}
          />
        </StepWrapper>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-200">
      <ToastContainer />
      <div className="print:hidden">
        <AnimatePresence>
          {isGenerating && step !== totalSteps - 2 && <LoadingOverlay />}
        </AnimatePresence>

        {step > 0 && step < totalSteps && (
          <Header
            surveyType={data.surveyType}
            step={step}
            totalSteps={totalSteps}
            userName={auth.user?.user_metadata?.full_name}
            onSignOut={auth.isAuthenticated ? auth.signOut : undefined}
            onBackToDashboard={handleBackToDashboard}
          />
        )}

        <main className="pt-24 pb-24 px-6 min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl relative">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
        </main>

        {step > 0 && step < totalSteps && (
          <Footer
            step={step}
            totalSteps={totalSteps}
            isGenerating={isGenerating}
            isSaving={isSaving}
            onBack={survey.handleBack}
            onNext={survey.handleNext}
            onSubmit={survey.handleSubmit}
          />
        )}
      </div>

      <PrintView data={data} />
    </div>
  );
}
