FROM jupyter/tensorflow-notebook


RUN pip install pixiedust git+https://github.com/Kings-Distributed-Systems/pixiedust_node#egg=pixiedust_node tensorflowjs tf-estimator-nightly 'ipykernel<5.0.0'

USER root

RUN apt-get update && \
      apt-get install -y curl && \
      apt-get -y autoclean



ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 10.20.1

RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash



RUN source $NVM_DIR/nvm.sh \
      && nvm install $NODE_VERSION \
      && nvm alias default $NODE_VERSION \
      && nvm use default



ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

USER $NB_UID


RUN node -v
RUN npm -v


RUN mkdir src/
WORKDIR src/

COPY . .

CMD ["jupyter", "notebook", "--port=8888", "--no-browser", "--ip=0.0.0.0", "--allow-root"]
