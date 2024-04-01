from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import TextLoader
from langchain_community.document_loaders import PyPDFLoader
import os
from dotenv import load_dotenv

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv('SECRET')


def answer(file):
    loader = PyPDFLoader(file)
    pages = loader.load_and_split()

    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_documents(pages, embedding=embeddings)

    llm = ChatOpenAI(temperature=0.7, model_name="gpt-4")

    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)

    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(),
        memory=memory)

    query = "Please summarize this report such that an ordinary person who is not related to medical-domain can also can understand in about 3-4 lines and also tell him what his next step should be."
    result = conversation_chain({"question": query})
    answer = result["answer"].replace('\n', '')

    return answer
