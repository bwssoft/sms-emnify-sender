"use client";

import React from "react";
import { useMessagePageForm } from "../../useMessagePageForm";

// import { Container } from './styles';

const FormInput: React.FC = () => {
    const { register } = useMessagePageForm();

    return (
        <textarea
            rows={1}
            className="w-full text- resize-none border-0 bg-transparent py-2 pr-10 pl-5 h-fit leading-[1.5em] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Escreva sua mensagem..."
            {...register("payload")}
        />
    );
};

export default FormInput;
